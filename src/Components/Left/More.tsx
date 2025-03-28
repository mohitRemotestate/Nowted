import archived from "../../assets/archived.svg";
import star from "../../assets/star.svg";
import trash from "../../assets/trash.svg";
import { NavLink } from "react-router-dom";

function More() {
  return (
    <div className="py-4 h-3/15">
      <div className="px-5 font-semibold text-white h-6.5 pb-2 ">More</div>
      <ul>
        <NavLink
          to={`/folder/favorite`}
          key="1"
          className="list hover:bg-gray-600"
        >
          <img src={star} /> favorites
        </NavLink>
        <NavLink
          to={`/folder/trash`}
          key="2"
          className="list hover:bg-gray-600"
        >
          <img src={trash} /> Trash
        </NavLink>
        <NavLink
          to={`/folder/archived`}
          key="3"
          className="list hover:bg-gray-600"
        >
          <img src={archived} /> Archived Notes
        </NavLink>
      </ul>
    </div>
  );
}

export default More;
