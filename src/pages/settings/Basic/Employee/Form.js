import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Input, message, Select, Row, Col, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const { Option } = Select;

const EmployeeForm = (props) => {
  const { id } = props;
  const firsNameRef = useRef(null);
  const navigate = useNavigate();
  const [formInitialValues, setFormInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    birthday: new Date,
    plantId: "Please select plant",
    departmentId: "Please select department",
    isPlatformUser: "No",
    isPlantHead: "No",
  });
  const [plants, setPlants] = useState(null);
  const [departments, setDepartments] = useState(null);

  //load employee data for edit action
  const loadEmployee = async () => {
    try {
      const employee = await axios
        .get(`/settings/employees/${id}`)
        .then((res) => res.data.data);

      setFormInitialValues({ 
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: employee.email,
        birthday: employee.birthday,
        employeeId: employee.id_num,
        plantId: employee.plant_id, 
        departmentId: employee.department_id,
        isPlatformUser: employee.is_platform_user,
        isPlantHead: employee.is_plant_head,    
      });
    } catch (err) {
      console.log('department load error =>', err);
    }
  };

  const loadRelationData = async () => {
    try {
      const relationData = await axios
        .get('/settings/employees/create')
        .then(res => res.data);
      setPlants(relationData.plants);
      setDepartments(relationData.departments);
    } catch(err) {
      console.log('department relation data load error=>', err);
    }
  }

  useEffect(() => {  
    loadRelationData();
    if (id > 0) {
      loadEmployee();
    }

    if (id !== -1) {
      firsNameRef.current.focus();
    }
  }, [id]);

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    employeeId: Yup.string().required(),
    birthday: Yup.date().required(),
    plantId: Yup.number().required(),
    departmentId: Yup.number().required(),
    isPlatformUser: Yup.string().required(),
    isPlantHead: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const newEmployee = {
        first_name: values.firstName,
        last_name: values.lastName,
        id_num: values.employeeId,
        email: values.email,
        birthday: moment(values.birthday).format("YYYY-MM-DD"),
        plant_id: values.plantId,
        department_id: values.departmentId,
        is_platform_user: values.isPlatformUser,
        is_plant_head: values.isPlantHead,
      };
      try {
        await axios[id ? "put" : "post"](`/settings/employees/${id || ""}`, newEmployee).then((res) => res.data);
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
    handleChange,
    setFieldValue,
    handleSubmit, 
    isSubmitting 
  } = formik;

  return (
      <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="bg-sky-500 px-4 py-4 text-lg text-white flex-none">
          {id ? "Edit" : "New"} Employee
        </div>

        <div className="flex-grow p-2">
          <Row>
            <Col span={8} className="px-4">
              <label>
                First Name <span className="text-red-600">*</span>
              </label>

              <Input
                className={`${touched.firstName && errors.firtName && "border-red-500"}`}
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                ref={firsNameRef}
              />
            </Col>
            <Col span={8} className="px-4">
              <label>
                Last Name <span className="text-red-600">*</span>
              </label>

              <Input
                className={`${touched.lastName && errors.lastName && "border-red-500"}`}
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </Col>
            <Col span={8} className="px-4">
              <label>
                Email Id <span className="text-red-600">*</span>
              </label>

              <Input
                className={`${touched.email && errors.email && "border-red-500"}`}
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={8} className="px-4">
              <label>
                Employee Id <span className="text-red-600">*</span>
              </label>

              <Input
                className={`${touched.employeeId && errors.employeeId && "border-red-500"}`}
                id="employeeId"
                name="employeeId"
                value={values.employeeId}
                onChange={handleChange}
              />
            </Col>
            <Col span={8} className="px-4">
              <label>
                DOB <span className="text-red-600">*</span>
              </label>

              <DatePicker
                className="w-full"
                value={moment(values.birthday)}
                onChange={value => formik.setFieldValue('birthday', value)}
              />
            </Col>
            <Col span={8} className="px-4">
              <label>
                Plant <span className="text-red-600">*</span>
              </label>

              <Select
                className={`${touched.plantId && errors.plantId && "border-red-500"}`}
                value={values.plantId}
                onChange={value => formik.setFieldValue('plantId', value)}
                className="w-full"
              >
                {plants?.map(plant => (
                  <Option value={plant.id}>
                    {plant.title}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={8} className="px-4">
              <label>
                Department <span className="text-red-600">*</span>
              </label>

              <Select
                value={values.departmentId}
                onChange={value => formik.setFieldValue('departmentId', value)}
                className="w-full"
              >
                {departments?.map(department => (
                  <Option value={department.id}>
                    {department.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8} className="px-4">
              <label>
                Platfom User?
              </label>

               <Select
                value={values.isPlatformUser}
                onChange={value => formik.setFieldValue('isPlatformUser', value)}
                className="w-full"
              >
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Col>
            <Col span={8} className="px-4">
              <label>
                Plant Head?
              </label>

               <Select
                value={values.isPlantHead}
                onChange={value => formik.setFieldValue('isPlantHead', value)}
                className="w-full"
              >
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit" className="flex-none">
          {isSubmitting && <FontAwesomeIcon icon={faSpinner} spin />}
          {!isSubmitting && "Submit"}
        </Button>
      </form>
  );
};

EmployeeForm.propTypes = {
  id: PropTypes.number,
  onSave: PropTypes.func,
}

EmployeeForm.defaultProps = {
  id: null,
  onSave: () => {}
}

export default EmployeeForm;
