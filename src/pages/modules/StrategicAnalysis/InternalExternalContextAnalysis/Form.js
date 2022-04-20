import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, 
  Input, 
  message, 
  Row, 
  Col, 
  Card,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const ContextAnalysisForm = (props) => {

  const { row } = props;
  const id = row.id;
  const editable = row.editable;
  const titleRef = useRef(null);
  const [formInitialValues, setFormInitialValues] = useState({
    title: "",
    list: [],
  });

  const columns = [
    {
      title: "Strength",
      dataIndex: "strength"
    },
    {
      title: "Weaknesses",
      dataIndex: "weaknesses"
    },
    {
      title: "Opportunities",
      dataIndex: "opportunities"
    },
    {
      title: "Threats",
      dataIndex: "threats"
    },
    {
      title: <div className="text-center">Action</div>,
      width: 100,
      hidden: !editable,
      render: (text, row, index) =>{
        return (
          <div className="text-center">   
            <Tooltip title="Delete">
              <Button
                className="border-0 hover:bg-transparent"
                icon={<FontAwesomeIcon icon={faTrash} style={{color: '#acadad'}}/>}
                onClick={(row) => deleteTableRow(index)}
              />
            </Tooltip>
          </div>
      )},
    }
  ].filter(item => !item.hidden);

  const [tableFormValues, setTableFormValues] = useState({
    strength: '',
    weaknesses: '',
    opportunities: '',
    threats: '',
  });


  //load employee data for edit action
  const loadContextAnalysis = async () => {
    try {
      const contextAnalysis = await axios
        .get(`/modules/strategic-analysis/context-analysises/${id}`)
        .then((res) => res.data.data);

      setFormInitialValues( pre => ({ 
        ...pre,
        title: contextAnalysis.title,
        list: contextAnalysis.context_analysis_lists   
      }));
    } catch (err) {
      console.log('department load error =>', err);
    }
  };


  useEffect(() => {  
    if (id > 0) {
      loadContextAnalysis();
    }

    if (id !== -1 && editable) {
      titleRef.current.focus();
    }
  }, [id]);

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    list: Yup.array().required(),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const newInterestedParties = {
        title: values.title,
        revision_at: moment(new Date()).format("YYYY-MM-DD"),
        created_by: '15',
        list: values.list,
      };
      try {
        await axios[id ? "put" : "post"](`/modules/strategic-analysis/context-analysises/${id || ""}`, newInterestedParties).then((res) => res.data);
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
    handleSubmit, 
    isSubmitting 
  } = formik;

  const handleTableFormChange = (e) => {
    if(e.type === 'change') {
      setTableFormValues({
        ...tableFormValues,
        [e.target.name]: e.target.value
      });
    } else {
      setTableFormValues({
        ...tableFormValues,
        type: e,
      });
    }
  }

  const addList = () => {
    setFormInitialValues(preValues => {
      const talbeListBuf = [];
      const newTableList = talbeListBuf.concat(preValues.list);
      newTableList.push(tableFormValues);
      return {
        title: titleRef.current.input.value,
        list: newTableList,
      };
    });

    setTableFormValues({
      strength: '',
      weaknesses: '',
      opportunities: '',
      threats: '',
    })
  }

  const deleteTableRow = (key) => {
    setFormInitialValues(pre => ({
      ...pre,
      list: pre.list.filter((list, index) => index !== key)
    }));
  }

  return (
      <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="bg-sky-500 px-4 py-4 text-lg text-white flex-none">
          {id ? "Edit" : "New"} Internal and External Context Analysis
        </div>
        <div className="flex-grow p-2">
          <Row>
            <Col span={8} className="px-4">
              <label>
                title <span className="text-red-600">*</span>
              </label>

              <Input
                className={`${touched.title && errors.title && "border-red-500"}`}
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                ref={titleRef}
              />
            </Col>
            <Col span={8} className="px-4">
              <label>
                Responsible <span className="text-red-600">*</span>
              </label>

              <Input
                disabled
                value="responsible"
              />
            </Col>
            <Col span={8} className="px-4">
              <label>
                Date <span className="text-red-600">*</span>
              </label>

              <Input
                disabled
                value={moment(new Date()).format('YYYY-MM-DD')}
              />
            </Col>
          </Row>
          <Card className="m-4">
            {editable && 
              <Row>
                <Col span={6} className="pr-4">
                  <label>
                    Strength
                  </label>

                  <Input
                    name="strength"
                    value={tableFormValues.strength}
                    onChange={handleTableFormChange}
                  />
                </Col>
                <Col span={6} className="px-4">
                  <label>
                    Weaknesses
                  </label>

                  <Input
                    name="weaknesses"
                    value={tableFormValues.weaknesses}
                    onChange={handleTableFormChange}
                  />
                </Col>
                <Col span={6} className="px-4">
                  <label>
                    Opportunities
                  </label>

                  <Input
                    name="opportunities"
                    value={tableFormValues.opportunities}
                    onChange={handleTableFormChange}
                  />
                </Col>
                <Col span={4} className="px-4">
                  <label>
                    Threats
                  </label>
                  
                  <Input
                    name="threats"
                    value={tableFormValues.threats}
                    onChange={handleTableFormChange}
                  />
                </Col>
                <Col span={2} className="pl-4">
                  <br/>
                  <Button 
                    type="primary" 
                    className="w-full"
                    onClick={() => addList()}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            }
            <Table
              className="mt-4"
              columns={columns}
              dataSource={formInitialValues.list}
              size="middle"
              key={Math.floor(Math.random()*100)}
              pagination={false}
            />
          </Card>
        </div>
        {editable &&
          <Button type="primary" htmlType="submit" className="flex-none">
            {isSubmitting && <FontAwesomeIcon icon={faSpinner} spin />}
            {!isSubmitting && "Submit"}
          </Button>
        }
      </form>
  );
};

ContextAnalysisForm.propTypes = {
  row: PropTypes.object,
  onSave: PropTypes.func,
}

ContextAnalysisForm.defaultProps = {
  row: {id: -1, editable: false},
  onSave: () => {}
}

export default ContextAnalysisForm;
