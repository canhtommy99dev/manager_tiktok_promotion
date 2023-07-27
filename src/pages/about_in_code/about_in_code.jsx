import { useParams, Link } from "react-router-dom";
function AboutInCode() {
  let { id } = useParams();

  return (
    <div>
      <h2>Welcome to the {id} course!</h2>

      <p>This is a great course. You're gonna love it!</p>

      <Link to="/courses">See all courses</Link>
    </div>
  );
}

export default AboutInCode;
