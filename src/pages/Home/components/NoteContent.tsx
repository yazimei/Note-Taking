import { useContext, useState } from "react";
import { Empty, Row, Col, Card, Space, Popconfirm } from "antd";
import { v4 as uuidV4 } from "uuid";
import {
  CloseOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useLocalStorage } from "../../hook";
import { HomeContext } from "..";
import NoteEdit from "./NoteEdit";
import "./index.scss";

interface NoteData {
  title: string;
  content: string;
}

interface Note extends NoteData {
  id: string;
}

const CursorStyle = { cursor: "pointer" };

export default () => {
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const { updateOpen } = useContext(HomeContext);
  const [info, setInfo] = useState<any>(null);

  const addNote = (o: NoteData) => {
    setNotes((pre: Note[]) => {
      console.log(pre, o);
      return [...pre, { ...o, id: uuidV4() }];
    });
    updateOpen(false);
  };

  const delNote = (id: string) => {
    const newNotes = notes.filter((i: Note) => i.id !== id);
    setNotes(newNotes);
    updateOpen(false);
    setInfo(null);
  };

  const editNote = (o: Note) => {
    const newEditNotes = notes.map((item: Note) => {
      if (item.id === o.id) {
        return o;
      } else {
        return item;
      }
    });
    setNotes(newEditNotes);
    updateOpen(false);
    setInfo(null);
  };

  return (
    <>
      {notes?.length ? (
        <Row gutter={[16, 24]}>
          {notes.map((item: Note) => (
            <Col span={8} key={item.id}>
              <Card
                title={item.title}
                extra={
                  <Space size={16} wrap>
                    <EditOutlined
                      style={CursorStyle}
                      onClick={() => {
                        setInfo(item);
                        updateOpen(true);
                      }}
                    />
                    <Popconfirm
                      title="确定删除此记录？"
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {
                        delNote(item.id)
                      }}
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                      <CloseOutlined style={CursorStyle} />
                    </Popconfirm>
                  </Space>
                }
              >
                <div className="card-content">{item.content}</div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="暂无笔记" />
      )}
      <NoteEdit
        info={info}
        onClose={() => {
          setInfo(null);
          updateOpen(false);
        }}
        onSubmit={(o: any, type) => {
          if (type) {
            editNote(o);
          } else {
            addNote(o);
          }
        }}
      />
    </>
  );
};
