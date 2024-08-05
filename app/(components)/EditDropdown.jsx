"use client";
import { useRouter } from "next/navigation";

function EditDropdown({ editType, list }) {
  const itemkey = editType + "Id";
  const editPage = "/admin/" + editType + "Edit/";

  const router = useRouter();
  const onchange = (e) => {
    router.push(editPage + e.target.value);
  };

  return (
    <div>
      <select onChange={onchange}>
        <option value="">Select a {editType}</option>
        {list.map((item) => {
          return (
            <option key={item._id} value={item[itemkey]}>
              {editType === "player"
                ? item.first_name + " " + item.last_name
                : item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default EditDropdown;
