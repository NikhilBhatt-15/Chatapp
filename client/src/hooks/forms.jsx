import { useState  } from "react";
// import {ChangeEvent} from "react";

const useFileHandler = (type, limitInMb = 5, maxFiles = 10) => {
    const initialFile = (type === "multiple" ? [] : null);
    const initialPreview = (type === "multiple" ? [] : null);
  
    const [error, setError] = useState(null);
    const [file, setFile] = useState(initialFile);
    const [preview, setPreview] = useState(initialPreview);
  
    const changeHandler = (e) => {
      if (!e.target.files) return;
      if (type === "single") {
        const singleFile = e.target.files[0];
        if (e.target.files.length > 1) {
          return setError("Cannot upload more than 1 file, please select type as 'Multiple'");
        }
  
        if (singleFile.size > 1024 * 1024 * limitInMb) {
          return setError("File size too large");
        }
        const reader = new FileReader();
  
        reader.readAsDataURL(singleFile);
        reader.onloadend = () => {
          setPreview(reader.result);
        };
  
        setFile(singleFile);
      }
      if (type === "multiple") {
        const files = Array.from(e.target.files);
  
        if (maxFiles && files.length > maxFiles) {
          return setError(`Maximum ${maxFiles} files allowed`);
        }
  
        for (const item of files) {
          if (item.size > 1024 * 1024 * limitInMb) {
            setError("File size too large");
            return;
          }
  
          const reader = new FileReader();
          reader.readAsDataURL(item);
          reader.onloadend = () => {
            setPreview((prev) => {
              if (Array.isArray(prev)) {
                return [...prev, reader.result];
              } else {
                return [reader.result];
              }
            });
          };
  
          setFile((prev) => {
            if (Array.isArray(prev)) {
              return [...prev, item];
            } else {
              return [item];
            }
          });
        }
      }
    };
  
    const clear = () => {
      setFile(initialFile);
      setPreview(initialPreview);
      setError(null);
    };
  
    return {
      file,
      preview,
      error,
      changeHandler,
      clear,
    };
  };
  
  
const useInputValidation = (initialVal, validator = () => undefined) => {
    const [value, setValue] = useState(initialVal);
    const [error, setError] = useState("");
  
    const changeHandler = (e) => {
      let newValue;
  
      if (typeof value === "number") {
        newValue = Number(e.target.value);
      } else {
        newValue = e.target.value;
      }
  
      setValue(newValue);
  
      const validationResult = validator(newValue);
      if (validationResult) {
        setError(validationResult.errorMessage);
      } else {
        setError("");
      }
    };
  
    const clear = () => {
      setValue(initialVal);
      setError("");
    };
  
    return {
      value,
      changeHandler,
      error,
      clear,
    };
  };
  
  
  
export {useInputValidation,useFileHandler};
  