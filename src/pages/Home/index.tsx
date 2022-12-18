import { useState, createContext } from "react";
import { Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NoteContent from "./components/NoteContent";
import "./index.scss";
const { Header, Content } = Layout;

interface IHomeContext {
    open: boolean;
    updateOpen: (v:boolean) => void;
  }
  const HomeContextDefaultValue = {
    open: false,
    updateOpen: (v:boolean) => {},
  }

const HomeContext = createContext<IHomeContext>(HomeContextDefaultValue);
const { Provider: HomeProvider } = HomeContext;

export default () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Layout className="layout">
      <Header>
        <div className="layout-title">Note Taking</div>
        <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          创建
        </Button>
      </Header>
      <HomeProvider
        value={{
          open: isOpen,
          updateOpen: (v:boolean) => setOpen(v)
        }}
      >
        <Content className="note-content">
          <NoteContent />
        </Content>
      </HomeProvider>
    </Layout>
  );
};
export { HomeContext };
