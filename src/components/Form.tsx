import "./init.tsx";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useRef } from "react";
import axios from "axios";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

function Form() {
  const image = useRef<HTMLInputElement>();

  const uploadFile = async (file) => {
    // S3 Bucket Name
    const S3_BUCKET = "bucketfulloftexts";

    // S3 Region
    const REGION = "us-east-2";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.KEY,
      secretAccessKey: process.env.SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to s3

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log("Uploading ");
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      console.log(data);

      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };

  function onImage() {
    image.current?.click();
  }

  function onSubmit(e) {
    console.log(typeof e);
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].files[0].name);

    const payload = {
      id: nanoid(),
      text: e.target[0].value,
      path: `bucketfulloftexts/${e.target[1].files[0].name}`,
    };

    uploadFile(e.target[1].files[0]);

    axios
      .post(
        "https://8imc2bkds2.execute-api.us-east-2.amazonaws.com/prod/dyno",
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
