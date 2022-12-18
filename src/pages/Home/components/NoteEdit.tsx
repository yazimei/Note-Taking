import { useEffect, useContext } from "react";
import { Row, Drawer, Col, Space, Button, Form, Input } from "antd";
import { HomeContext } from "..";

interface InfoProps {
  id?: string;
  title?: string;
  content?: string;
}

interface EditProps {
  info: InfoProps | null;
  onClose: () => void;
  onSubmit: (o: InfoProps, t: boolean) => void;
}

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

export default ({ info = null, onClose, onSubmit }: EditProps) => {
  const { open } = useContext(HomeContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
        if (info?.title) {
            form.setFieldsValue({ title: info.title, content: info.content });
        } else {
            form.resetFields()
        }
    }
  }, [info, open]);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const params = info?.id ? { ...values, id: info.id } : values;
      onSubmit(params, !!info?.id);
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };
  return (
    <Drawer
      title={info?.id ? info.title : "新建笔记"}
      width={800}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      key="note"
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
          <Button onClick={() => onFinish()} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: "标题不为空！",
            },
          ]}
        >
          <Input placeholder="请输入标题" max={20} />
        </Form.Item>
        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: "内容不为空" }]}
        >
          <TextArea showCount rows={6} maxLength={600} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
