import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Divider,
  Typography,
  Image,
  Breadcrumb,
  List,
  Input,
  Button,
  Switch,
} from "antd";
import {
  createSearchParams,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MedicinalApi from "../api/MedicinalApi";
import axios from "axios";
const { Content } = Layout;

const Comment = ({ comment }) => {
  console.log(comment, "comment");
  const navigate = useNavigate();
  return (
    <div className="Comment">
      <div className="CommentHeader">
        <img
          src={"https://static.thenounproject.com/png/363640-200.png"}
          alt={comment?.user?.name}
          className="UserImage"
        />
        <div className="UserInfo">
          <span className="UserName">{comment?.user?.name}</span>
          <span className="CommentDate">
            {new Date(comment?.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 10 }}
        className="CommentBody"
      >
        <p>{comment?.name}</p>
        <Button
          onClick={() => {
            navigate({
              search: createSearchParams({
                parentId: comment._id,
              }).toString(),
            });
          }}
        >
          Trả lời
        </Button>
      </div>
      {comment.children && comment.children.length > 0 && (
        <div className="CommentChildren">
          {comment.children.map((childComment) => (
            <Comment key={childComment._id} comment={childComment} />
          ))}
        </div>
      )}
    </div>
  );
};

const MedicinalDetail = () => {
  const { id } = useParams();
  const [medicinal, setMedicinal] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [comments2, setComments2] = useState([]);
  const [searchParams] = useSearchParams();
  const [newComment, setNewComment] = useState({
    author: "",
    content: "",
  });
  const parentIdSearch = searchParams.get("parentId");
  console.log(medicinal);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    try {
      const response = await MedicinalApi.getById(id);
      setMedicinal(response.data);
      setComments2(response.populatedComments);
      const commentResponse = await MedicinalApi.getComments(id);
      setComments(commentResponse);
    } catch (error) {
      console.error("Error fetching medicinal detail:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  const [loggedIn, setLoggedIn] = useState(false); // State để kiểm tra đăng nhập
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  useEffect(() => {
    // Kiểm tra xem có thông tin người dùng trong localStorage không
    const userData = localStorage.getItem("user");
    if (userData) {
      // Nếu có, cập nhật state loggedIn và user
      const parsedUserData = JSON.parse(userData);
      setLoggedIn(true);
      setUser(parsedUserData.user);
    }
    console.log(user);
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleAddComment = async () => {
    try {
      const data = {
        name: newComment.content,
        idUser: userLocal.user._id,
        medicinalId: id,
        imgUser: "a.png",
        parentId:
          parentIdSearch && parentIdSearch != "" ? parentIdSearch : null,
      };
      await axios.post("http://localhost:8080/create-comment", data);
      fetchData();
      // const commentResponse = await MedicinalApi.getComments(id);
      // setComments(commentResponse);
      setNewComment({ author: "", content: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!medicinal) {
    return null; // Or render a spinner/loading indicator
  }

  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Breadcrumb style={{ marginBottom: "16px" }}>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/list">Dược liệu</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{medicinal.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Chi tiết dược liệu "{medicinal.name}"{" "}
        </h1>
        <Card>
          <div style={{ display: "flex" }}>
            <div>
              <Image src={medicinal.imageUrl} alt={medicinal.name} />
            </div>
            <div style={{ marginLeft: "25px" }}>
              <Typography.Title level={2}>{medicinal.name}</Typography.Title>
              <Typography.Paragraph>
                <span style={{ fontWeight: "bold", marginRight: "3px" }}>
                  Tên tiếng việt ( tên gọi khác ):
                </span>
                {medicinal.vietnameseName}
              </Typography.Paragraph>
              <Divider />
              <Typography.Paragraph>
                <span style={{ fontWeight: "bold", marginRight: "3px" }}>
                  Tên khoa học:
                </span>
                {medicinal.courseName}
              </Typography.Paragraph>
              <Typography.Paragraph>
                <span style={{ fontWeight: "bold", marginRight: "3px" }}>
                  Họ:
                </span>
                {medicinal.family}
              </Typography.Paragraph>
              <Typography.Paragraph>
                <span style={{ fontWeight: "bold", marginRight: "3px" }}>
                  Công dụng:
                </span>
                {medicinal.utility}
              </Typography.Paragraph>
            </div>
          </div>
          <Divider />
          <Typography.Paragraph>
            <span style={{ fontWeight: "bold", marginRight: "3px" }}>
              Mô tả:
            </span>
          </Typography.Paragraph>
          <Typography.Paragraph>{medicinal.description}</Typography.Paragraph>
          <Divider />
          <Typography.Paragraph>
            <span style={{ fontWeight: "bold", marginRight: "3px" }}>
              Sinh thái:
            </span>
            {medicinal.ecology}
          </Typography.Paragraph>
          <Divider />
          <Typography.Paragraph>
            <span style={{ fontWeight: "bold", marginRight: "3px" }}>
              Phân bố:
            </span>
          </Typography.Paragraph>
          <Typography.Paragraph>{medicinal.distribution}</Typography.Paragraph>
          <Divider />
          <Typography.Paragraph>
            <span style={{ fontWeight: "bold", marginRight: "3px" }}>
              Bộ phận dùng:
            </span>
            {medicinal.usedPart}
          </Typography.Paragraph>
        </Card>
      </Content>
      <Content
        style={{
          margin: "50px",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <div className="CommentList">
          <div className="CommentList">
            <h2>Comments</h2>
            {comments2.map((comment) => {
              console.log(comment);
              return <Comment key={comment._id} comment={comment} />;
            })}
          </div>
          <form className="CommentList__form" autoComplete="off">
            <div className="CommentList__input">
              <label style={{ marginBottom: "10px" }} htmlFor="content">
                Comment
              </label>
              <Input
                name="content"
                value={newComment.content}
                onChange={handleInputChange}
                placeholder="Your comment"
                id="content"
              />
            </div>
            <div className="CommentList__add">
              {loggedIn ? (
                <Button
                  type="primary"
                  onClick={handleAddComment}
                  style={{ marginRight: "1em" }}
                >
                  Bình luận
                </Button>
              ) : (
                <Button type="primary" disabled style={{ marginRight: "1em" }}>
                  Bạn cần đăng nhập để bình luận
                </Button>
              )}{" "}
              {parentIdSearch && parentIdSearch != "" && (
                <Button
                  type="primary"
                  onClick={() =>
                    navigate({
                      search: createSearchParams({
                        parentId: "",
                      }).toString(),
                    })
                  }
                  style={{ marginRight: "1em" }}
                >
                  Hủy trả lời
                </Button>
              )}
            </div>
          </form>
        </div>
      </Content>
    </Layout>
  );
};

export default MedicinalDetail;
