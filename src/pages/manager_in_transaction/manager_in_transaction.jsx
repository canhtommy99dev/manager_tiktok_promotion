import { useEffect, useState } from "react";

import { UserTransactionServices } from "../../services/TransactionService";
import ItemTableShow from "./components/item_table_show";
// import ReactPaginate from "react-paginate";
// import lodash from "lodash";

export default function ManagerInTransaction() {
  const [listTrasaction, setListTrasaction] = useState([]);

  const getUser = async () => {
    let res = await UserTransactionServices();
    if (res && res.results) {
      setListTrasaction(res.results);
      //   setListUser(res.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {listTrasaction &&
        listTrasaction.length > 0 &&
        listTrasaction.map((item, index) => {
          return (
            <div>
              <div className="my-3 add-new">
                <span>
                  <b>
                    {item.date_create_at} - {item.price_transaction_in}VNĐ
                  </b>
                </span>{" "}
              </div>
              <ItemTableShow listItem={item.list_show_transaction} />
            </div>
          );
        })}
    </div>
  );
}
