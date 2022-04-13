import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, message, Select } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const ProductGroupForm = (props) => {
  const { id } = props;
  const [formInitialValues, setFormInitialValues] = useState({
    employeeId: "Please select employee",
  });
  const [employees, setEmployees] = useState(null);

  const loadMgtRep = async () => {
    try {
      const mgtRep = await axios
        .get(`/settings/mgt-reps/${id}`)
        .then((res) => res.data);

      setFormInitialValues({ employeeId: mgtRep.data.employee_id });
    } catch (err) {}
  };

  const loadRelationData = async () => {
    const relationData = await axios
      .get('settings/mgt-reps/create')
      .then(res => res.data);

    setEmployees(relationData.employees);
  }

  useEffect(() => {
    loadRelationData();
    if (id > 0) {
      loadMgtRep();
    }
  }, [id]);

  const formSchema = Yup.object().shape({
    employeeId: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await axios[id ? "put" : "post"](`/settings/mgt-reps/${id || ""}`, {
          employee_id: values.employeeId,
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

  const { 
    values, 
    errors, 
    touched,
    setFieldValue, 
    handleSubmit, 
    isSubmitting 
  } = formik;

  return (
      <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="bg-sky-500 px-4 py-4 text-lg text-white flex-none">
          {id ? "Edit" : "New"} Management Representatvie
        </div>

        <div className="flex-grow p-2">
          <div>
            <label>
              Name <span className="text-red-600">*</span>
            </label>

            <Select
              className={`${touched.name && errors.name && "border-red-500"} w-fll`}
              value={values.employeeId}
              onChange={value => setFieldValue('employeeId', value)}
            >
              {employees?.map(employee =>
                <Option value={employee.id}>
                  {employee.first_name + ' ' + employee.last_name}
                </Option>
              )}
            </Select>
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
