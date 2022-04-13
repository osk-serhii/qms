import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Input, message, Select } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const ProductGroupForm = (props) => {
  const { id } = props;
  const titleRef = useRef(null);
  const [formInitialValues, setFormInitialValues] = useState({
    name: "",
    plantId: "Please select plant",
    productGroupId: "Please select product group",
    headId: "Please select department head"
  });
  const [plants, setPlants] = useState(null);
  const [productGroups, setProductGroups] = useState(null);
  const [heads, setHeads] = useState(null);

  const loadDepartment = async () => {
    try {
      const department = await axios
        .get(`/settings/departments/${id}`)
        .then((res) => res.data.data);

      setFormInitialValues({ 
        name: department.name,
        plantId: department.plant_id,
        productGroupId: department.product_group_id,
        headId: department.head_id 
      });
    } catch (err) {
      console.log('department load error =>', err);
    }
  };

  const loadRelationData = async () => {
    try {
      const relationData = await axios
        .get('/settings/departments/create')
        .then(res => res.data);
      setPlants(relationData.plants);
      setProductGroups(relationData.product_groups);
      setHeads(relationData.employees);
    } catch(err) {
      console.log('department relation data load error=>', err);
    }
  }

  useEffect(() => {  
    loadRelationData();
    if (id > 0) {
      loadDepartment();
    }

    if (id !== -1) {
      titleRef.current.focus();
    }
  }, [id]);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    plantId: Yup.number().required(),
    productGroupId: Yup.number().required(),
    headId: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await axios[id ? "put" : "post"](`/settings/departments/${id || ""}`, {
          name: values.name,
          plant_id: values.plantId,
          product_group_id: values.productGroupId,
          head_id: values.headId,
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
    handleChange,
    setFieldValue,
    handleSubmit, 
    isSubmitting 
  } = formik;

  return (
      <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="bg-sky-500 px-4 py-4 text-lg text-white flex-none">
          {id ? "Edit" : "New"} Department
        </div>

        <div className="flex-grow p-2">
          <div>
            <label>
              Title <span className="text-red-600">*</span>
            </label>

            <Input
              className={`${touched.name && errors.name && "border-red-500"}`}
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              ref={titleRef}
            />
          </div>
          <div className="mt-4">
            <label>
              Plant <span className="text-red-600">*</span>
            </label>

            <Select
              className={`${touched.plantId && errors.plantId && "border-red-500"} w-fll`}
              value={values.plantId}
              onChange={value => setFieldValue('plantId', value)}
            >
              {plants?.map(plant => (
                <Option value={plant.id}>
                  {plant.title}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mt-4">
            <label>
              Product Group <span className="text-red-600">*</span>
            </label>

            <Select
              className="w-full"
              value={values.productGroupId}
              onChange={value => setFieldValue('productGroupId', value)}
            >
              {productGroups?.map(productGroup => (
                <Option value={productGroup.id}>
                  {productGroup.title}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mt-4">
            <label>
              Product Head <span className="text-red-600">*</span>
            </label>

            <Select 
              className="w-full"
              value={values.headId}
              onChange={value => setFieldValue('headId', value)}
            >
              {heads?.map(head => (
                <Option value={head.id}>
                  {head.first_name + head.last_name}
                </Option>
              ))}
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
