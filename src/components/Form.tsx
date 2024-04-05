import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useRef } from "react";

function Form() {
  const image = useRef();

  function onImage() {
    image.current.click();
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
  }
  return (
    <form className="form-container" onSubmit={onSubmit}>
      <span>
        <label> Please enter the text to append</label>
        <input type="text" name="text" placeholder="Eg: Hello" />
      </span>
      <div id="img-input" onClick={onImage}>
        <FileUploadRoundedIcon fontSize="large" sx={{ color: "#303030" }} />
        <input name="txtFile" type="file" accept=".txt" ref={image} />
        <p>Please upload the text file</p>
      </div>
      <span>
        <input type="submit" value="Submit" />
      </span>
    </form>
  );
}

export default Form;
