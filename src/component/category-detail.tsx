import React from "react";
import { Row, Col, Button, Typography, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const renderGateInputs = (gateValues) => {
  if (!gateValues || gateValues.length === 0) return null;

  return gateValues.map((value, index) => (
    <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
      <Form.Item
        label={`Gate ${index + 1}`}
        labelCol={{ style: { fontWeight: "bold" } }}
        wrapperCol={{ style: { background: "none" } }}
      >
        <Input
          style={{ background: "none", color: "black" }}
          disabled
          value={value}
        />
      </Form.Item>
    </Col>
  ));
};

const CategoryDetail = ({ categorySelected, onBack }) => {
  return (
    <Row justify="center" style={{ padding: "12px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={{ marginRight: "10px" }}
          />
          <Title level={3} style={{ margin: "0" }}>
            Category Detail
          </Title>
        </div>
        <Form
          initialValues={{
            Id: categorySelected?.Id,
            Category: categorySelected?.Category,
            Gate: categorySelected?.Gate,
            Datatime: categorySelected?.Datatime,
          }}
          layout="vertical"
        >
          <Row justify="space-between" style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Form.Item
                label="Category"
                name="Category"
                labelCol={{ style: { fontWeight: "bold" } }}
              >
                <Input
                  style={{ background: "none", color: "black" }}
                  disabled
                />
              </Form.Item>
              <Form.Item
                label="Datatime"
                name="Datatime"
                labelCol={{ style: { fontWeight: "bold" } }}
              >
                <Input
                  style={{ background: "none", color: "black" }}
                  disabled
                />
              </Form.Item>
              <Row gutter={[16, 0]}>
                {/* Assuming renderGateInputs is a method in the parent component */}
                {renderGateInputs(categorySelected?.Gate)}
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CategoryDetail;
