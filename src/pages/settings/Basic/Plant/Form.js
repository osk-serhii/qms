import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProductGroupForm = (props) => {
  const { id } = props;
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [formInitialValues, setFormInitialValues] = useState({
    title: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios
          .get(`/settings/plants/${id}`)
          .then((res) => res.data);

        setFormInitialValues({ title: response.data.title });
      } catch (err) {}
    };

    if (id > 0) {
      loadData();
    }

    if (id !== -1) {
      titleRef.current.focus();
    }
  }, [id]);

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await axios[id ? "put" : "post"](`/settings/plants/${id || ""}`, {
          title: values.title,
        }).then((res) => res.data);

        props.onSave();
        message.success("Succefully saved.");
      } catch (err) {
        message.error(
          "Something went wrong on server. Please try again later."
        );
      }
      setSubmitting(false);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    formik;

  return (
      <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="bg-sky-500 px-4 py-4 text-lg text-white flex-none">
          {id ? "Edit" : "New"} Product Group
        </div>

        <div className="flex-grow p-2">
          <div>
            <label>
              Title <span className="text-red-600">*</span>
            </label>

            <Input
              className={`${touched.title && errors.title && "border-red-500"}`}
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              ref={titleRef}
            />
          </div>
        </div>

        <Button type="primary" htmlType="submit" className="flex-none">
          {isSubmitting && <FontAwesomeIcon icon={faSpinner} spin />}
          {!isSubmitting && "Submit"}
        </Button>
      </form>
  );
};

ProductGroupForm.propTypes = {
  id: PropTypes.number,
  onSave: PropTypes.func,
}

ProductGroupForm.defaultProps = {
  id: null,
  onSave: () => {}
}

export default ProductGroupForm;
