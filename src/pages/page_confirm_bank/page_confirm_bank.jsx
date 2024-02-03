import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getInfoConfirmMoney,
  putAPIChangeMoney,
} from "../../services/HistoryTransaction";
import { rest } from "lodash";

export default function PageComfirmBank() {
  let { id } = useParams();
  const [idBankName, setIdBankName] = useState("");
  const [idBank, setIdBank] = useState("");
  const [numberWithDraw, setNumberWithDraw] = useState("");
  const [numberRemaining, setNumberRemaining] = useState("");
  const [numberTotal, setNumberTotal] = useState("");
  const [numberWithDrawInt, setNumberWithDrawInt] = useState(0);
  const [numberRemainingInt, setNumberRemainingInt] = useState(0);
  const [userId, setUserId] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    handleGetInfo();
  }, []);

  const handleGetInfo = async () => {
    const restAPI = await getInfoConfirmMoney(id);
    if (restAPI && restAPI.status === "success") {
      setIdBankName(`${restAPI.results.user_guest}`);
      setIdBank(
        `STK: ${restAPI.results.payment_bank.id_bank} Ngân Hàng: ${restAPI.results.payment_bank.more_back.name} - ${restAPI.results.payment_bank.more_back.shortName}`
      );
      setNumberWithDraw(
        `${Number(restAPI.results.id_price_withdraw).toLocaleString(
          "en-US"
        )} VNĐ`
      );
      setNumberRemaining(
        `${Number(restAPI.results.coin_user).toLocaleString("en-US")} VNĐ`
      );
      setNumberWithDrawInt(restAPI.results.id_price_withdraw);
      setNumberRemainingInt(restAPI.results.coin_user);
      setUserId(restAPI.results.id_user_money);
      setNumberTotal(
        `${Number(
          restAPI.results.coin_user - restAPI.results.id_price_withdraw
        ).toLocaleString("en-US")} VNĐ`
      );

      if (restAPI.results.status === "Success") {
        setShowButton(true);
      } else if (restAPI.results.status === "Loading Withdraw") {
        setShowButton(false);
      }
    } else if (restAPI.status === "failed") {
      setShowButton(true);
    }
  };

  const handleClickBack = () => {
    window.location.href = `/withdraw_manager`;
  };

  const handleClickConfirm = async () => {
    setShowButton(true);
    const resAPIRsults = await putAPIChangeMoney(id, numberWithDrawInt, userId);
    if (resAPIRsults) {
      if (resAPIRsults.status === "not-withdraw") {
        setShowButton(false);
        toast.error("Số dư không đủ xin vui lòng thử lại");
      } else {
        toast.success("Số dư đã được rút tiền");
        handleClickBack();
        setShowButton(true);
      }
    } else {
      toast.error("Delete Failed");
      setShowButton(false);
    }
  };

  return (
    <div>
      <Button variant="link" onClick={() => handleClickBack()}>
        Quay lại
      </Button>
      <div>
        {" "}
        <h2>Xác nhận rút tiền</h2>
        <h2>ID Rút: {id}</h2>
      </div>
      <br />
      {`${idBankName} - ${idBank}`}
      <br />
      {`Số dư còn lại rút: ${numberRemaining}`}
      <br />
      {`Khách cần rút: ${numberWithDraw}`}
      <br />
      {`Số dư đã trừ là: ${numberTotal}`}
      <br />
      <Button
        variant="primary"
        disabled={showButton}
        onClick={() => handleClickConfirm()}
      >
        Xác Nhận
      </Button>
    </div>
  );
}
