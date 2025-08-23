import { Form, Input, Modal, Select } from "antd";

const { Option } = Select;

const UserModal = ({ visible, onCancel, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Admin Information"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      // okText="Send Invite"
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input type="tel" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="moderator">Moderator</Option>
            <Option value="content_manager">Content Manager</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: "Please select permissions!" }]}
        >
          <Select mode="multiple" placeholder="Select permissions">
            <Option value="create_user">Create User</Option>
            <Option value="read_user">Read User</Option>
            <Option value="update_user">Update User</Option>
            <Option value="delete_user">Delete User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
