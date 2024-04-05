import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useRef } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

function Form() {
  const image = useRef<HTMLInputElement>();

  function onImage() {
    image.current?.click();
  }

  function onSubmit(e) {
    console.log(typeof e);
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);

    const payload = {
      name: nanoid(),
      text: e.target[0].value,
      path: e.target[1].value,
    };

    axios
      .post(
        "https://8imc2bkds2.execute-api.us-east-2.amazonaws.com/prod",
        payload
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
