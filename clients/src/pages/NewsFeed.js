import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import {
  createSearchParams,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
const NewsFeed = () => {
  const [dataNew, setDataNew] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const userLocal = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handelFetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/get-all-feeds"
      );
      setDataNew(data);
    };
    handelFetch();
  }, []);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    const dataCreate = {
      name: values.username,
      description: values.password,
      image: formData,
      status: false,
    };
    await axios.post(
      "http://localhost:8080/api/create-newFeed/" + userLocal.user._id,
      dataCreate
    );
    onClose();
    toast.success("Tạo bài thành công , admin sẽ xem xét và duyệt bài của bạn");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Drawer width={500} title="Tạo tin tức mới" onClose={onClose} open={open}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Ảnh" name="image">
            <Input type="file" onChange={handleImageChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <div className="breadcrumb">
        <div className="wrap">
          <h1 className="archive-heading">
            <a title="Bản tin dược liệu" rel="nofollow">
              Bản tin dược liệu
            </a>
          </h1>
          <span
            className="breadcrumb-link-wrap"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a className="breadcrumb-link" itemProp="item">
              <span className="breadcrumb-link-text-wrap" itemProp="name">
                Trang chủ
              </span>
            </a>
            <meta itemProp="position" content={1} />
          </span>
          <span className="label"> » </span>Bản tin dược liệu
          <span
            style={{ position: "relative", right: "-800px" }}
            className="archive-heading"
          >
            <a onClick={showDrawer} title="Bản tin dược liệu" rel="nofollow">
              Tạo tin mới
            </a>
          </span>
        </div>
      </div>
      <div className="site-inner">
        <div className="content-sidebar-wrap">
          <main className="content">
            {dataNew
              ?.filter((ic) => ic.status == true)
              ?.map((items) => {
                return (
                  <article
                    key={items._id}
                    className="post-45995 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu category-thong-tin-khoa-hoc tag-benh-gan tag-ca-gai-leo tag-phan-biet q2w3-post-order q2w3-post-order-2 entry"
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                    style={{ height: "281px" }}
                  >
                    <a
                      className="entry-image-link"
                      onClick={() => navigate("/news/" + items._id)}
                      aria-hidden="true"
                    >
                      <img
                        style={{ width: "360px", height: "240px" }}
                        className="alignleft post-image entry-image lazyloaded"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/06/ca-gai-leo-avata.jpg"
                      />
                    </a>
                    <header className="entry-header">
                      <h2 className="entry-title" itemProp="headline">
                        <a
                          className="entry-title-link"
                          rel="bookmark"
                          onClick={() => navigate("/news/" + items._id)}
                        >
                          {items.name}
                        </a>
                      </h2>
                    </header>
                    <div className="entry-content" itemProp="text">
                      <p>
                        {items.description.length > 30
                          ? items.description.slice(0, 30) + "..."
                          : items.description}
                      </p>
                      <div>
                        <a
                          onClick={() => navigate("/news/" + items._id)}
                          className="more-link"
                        >
                          Đọc thêm
                        </a>
                      </div>
                      <p />
                    </div>
                    <footer className="entry-footer" />
                  </article>
                );
              })}
          </main>
          <aside
            className="sidebar sidebar-primary widget-area"
            role="complementary"
            aria-label="Primary Sidebar"
            itemScope
            itemType="https://schema.org/WPSideBar"
          >
            <section id="media_image-3" className="widget widget_media_image">
              <div className="widget-wrap">
                <a href="https://tracuuduoclieu.vn/tra-cuu-duoc-lieu/">
                  <img
                    width={360}
                    height={100}
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner1.jpg"
                    className="image wp-image-95 attachment-full size-full lazyloaded"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner1.jpg"
                  />
                </a>
              </div>
            </section>
            <section id="media_image-4" className="widget widget_media_image">
              <div className="widget-wrap">
                <a href="https://tracuuduoclieu.vn/danh-luc-cay-thuoc/">
                  <img
                    width={360}
                    height={100}
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner2.jpg"
                    className="image wp-image-96 attachment-full size-full lazyloaded"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner2.jpg"
                  />
                </a>
              </div>
            </section>
            <section id="media_image-5" className="widget widget_media_image">
              <div className="widget-wrap">
                <a href="https://tracuuduoclieu.vn/tra-cuu-theo-benh/">
                  <img
                    width={360}
                    height={100}
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner3.jpg"
                    className="image wp-image-97 attachment-full size-full lazyloaded"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner3.jpg"
                  />
                </a>
              </div>
            </section>
            <section id="media_image-6" className="widget widget_media_image">
              <div className="widget-wrap">
                <a href="https://tracuuduoclieu.vn/tra-cuu-bai-thuoc/">
                  <img
                    width={360}
                    height={100}
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner4.jpg"
                    className="image wp-image-98 attachment-full size-full lazyloaded"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner4.jpg"
                  />
                </a>
              </div>
            </section>
            <section
              id="caia-post-list-8"
              className="widget caia-post-list-widget"
            >
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">Bài viết nổi bật</h4>
                <div className="main-posts">
                  <div className="post-46776 post type-post status-publish format-standard has-post-thumbnail category-nghien-cuu-moi tag-pueraria-mirifica tag-sam-to-nu tag-tinh-dau entry">
                    <a
                      href="https://tracuuduoclieu.vn/thanh-phan-hoa-hoc-trong-tinh-dau-loai-pueraria-mirifica-kwao-krua-trang.html"
                      title="Thành phần hóa học trong tinh dầu loài Pueraria mirifica (Kwao krua trắng)"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={360}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/07/mirifica-6-360x360.jpg"
                        className="attachment-thumbnail size-thumbnail lazyloaded"
                        alt="Thành phần hóa học trong tinh dầu loài Pueraria mirifica (Kwao krua trắng)"
                        title="Thành phần hóa học trong tinh dầu loài Pueraria mirifica (Kwao krua trắng)"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/07/mirifica-6-360x360.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/thanh-phan-hoa-hoc-trong-tinh-dau-loai-pueraria-mirifica-kwao-krua-trang.html"
                        title="Thành phần hóa học trong tinh dầu loài Pueraria mirifica (Kwao krua trắng)"
                      >
                        Thành phần hóa học trong tinh dầu loài Pueraria mirifica
                        (Kwao krua trắng)
                      </a>
                    </h3>
                    <div className="clear" />{" "}
                  </div>{" "}
                  <div className="post-45963 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu category-nghien-cuu-moi category-thong-tin-khoa-hoc q2w3-post-order q2w3-post-order-3 entry">
                    <a
                      href="https://tracuuduoclieu.vn/vach-tran-xa-den-gia-lay-tien-that-day-benh-nhan-den-gan-cai-chet.html"
                      title="Xạ đen giả mà giá như hàng thật – bệnh nhân đến gần cái chết"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/05/xa-den-avata-3-360x240.jpg"
                        className="attachment-thumbnail size-thumbnail lazyloaded"
                        alt="Xạ đen giả mà giá như hàng thật – bệnh nhân đến gần cái chết"
                        title="Xạ đen giả mà giá như hàng thật – bệnh nhân đến gần cái chết"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/05/xa-den-avata-3-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/vach-tran-xa-den-gia-lay-tien-that-day-benh-nhan-den-gan-cai-chet.html"
                        title="Xạ đen giả mà giá như hàng thật – bệnh nhân đến gần cái chết"
                      >
                        Xạ đen giả mà giá như hàng thật – bệnh nhân đến gần cái
                        chết
                      </a>
                    </h3>
                    <div className="clear" />{" "}
                  </div>{" "}
                  <div className="post-451 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu category-phat-trien-duoc-lieu q2w3-post-order q2w3-post-order-21 entry">
                    <a
                      href="https://tracuuduoclieu.vn/nhung-loai-cay-duoc-lieu-quy-hiem-co-gia-tri-nhat-tai-viet-nam-can-duoc-bao-ton.html"
                      title="Những loại cây dược liệu quý hiếm có giá trị nhất tại Việt Nam cần được bảo tồn"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/07/thuoc-quy-bao-ton-avata-360x240.jpg"
                        className="attachment-thumbnail size-thumbnail lazyloaded"
                        alt="Những loại cây dược liệu quý hiếm có giá trị nhất tại Việt Nam cần được bảo tồn"
                        title="Những loại cây dược liệu quý hiếm có giá trị nhất tại Việt Nam cần được bảo tồn"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/07/thuoc-quy-bao-ton-avata-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/nhung-loai-cay-duoc-lieu-quy-hiem-co-gia-tri-nhat-tai-viet-nam-can-duoc-bao-ton.html"
                        title="Những loại cây dược liệu quý hiếm có giá trị nhất tại Việt Nam cần được bảo tồn"
                      >
                        Những loại cây dược liệu quý hiếm có giá trị nhất tại
                        Việt Nam cần được bảo tồn
                      </a>
                    </h3>
                    <div className="clear" />{" "}
                  </div>{" "}
                  <div className="post-355 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu tag-ba-kich entry">
                    <a
                      href="https://tracuuduoclieu.vn/huong-dan-cach-ngam-ruou-ba-kich-tim-ngon-dung-chuan.html"
                      title="Hướng dẫn cách ngâm rượu ba kích tím ngon đúng chuẩn"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2021/04/tcdl-1401-huong-dan-cach-ngam-ruou-ba-kich-tim-ngon-dung-chuan-1-360x240.jpg"
                        className="attachment-thumbnail size-thumbnail lazyloaded"
                        alt="Hướng dẫn cách ngâm rượu ba kích tím ngon đúng chuẩn"
                        title="Hướng dẫn cách ngâm rượu ba kích tím ngon đúng chuẩn"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2021/04/tcdl-1401-huong-dan-cach-ngam-ruou-ba-kich-tim-ngon-dung-chuan-1-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/huong-dan-cach-ngam-ruou-ba-kich-tim-ngon-dung-chuan.html"
                        title="Hướng dẫn cách ngâm rượu ba kích tím ngon đúng chuẩn"
                      >
                        Hướng dẫn cách ngâm rượu ba kích tím ngon đúng chuẩn
                      </a>
                    </h3>
                    <div className="clear" />{" "}
                  </div>{" "}
                  <div className="post-354 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu tag-ba-kich entry">
                    <a
                      href="https://tracuuduoclieu.vn/hinh-anh-chi-tiet-cay-ba-kich-tim-de-nhan-biet-nhat.html"
                      title="Hình ảnh chi tiết cây ba kích tím dễ nhận biết nhất"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/10/hinh-anh-chi-tiet-cay-ba-kich-tim-360x240-360x240.jpg"
                        className="attachment-thumbnail size-thumbnail lazyloaded"
                        alt="Hình ảnh chi tiết cây ba kích tím dễ nhận biết nhất"
                        title="Hình ảnh chi tiết cây ba kích tím dễ nhận biết nhất"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/10/hinh-anh-chi-tiet-cay-ba-kich-tim-360x240-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/hinh-anh-chi-tiet-cay-ba-kich-tim-de-nhan-biet-nhat.html"
                        title="Hình ảnh chi tiết cây ba kích tím dễ nhận biết nhất"
                      >
                        Hình ảnh chi tiết cây ba kích tím dễ nhận biết nhất
                      </a>
                    </h3>
                    <div className="clear" />{" "}
                  </div>{" "}
                  <div className="post-222 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu tag-sam-cau entry">
                    <a
                      href="https://tracuuduoclieu.vn/tac-dung-khong-ngo-cua-cu-sam-cau-rung-ngam-ruou.html"
                      title="Tác dụng không ngờ của củ sâm cau rừng ngâm rượu"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2021/02/sam-cau-4-360x240-360x240.jpg"
                        className="attachment-thumbnail size-thumbnail ls-is-cached lazyloaded"
                        alt="Tác dụng không ngờ của củ sâm cau rừng ngâm rượu"
                        title="Tác dụng không ngờ của củ sâm cau rừng ngâm rượu"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2021/02/sam-cau-4-360x240-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/tac-dung-khong-ngo-cua-cu-sam-cau-rung-ngam-ruou.html"
                        title="Tác dụng không ngờ của củ sâm cau rừng ngâm rượu"
                      >
                        Tác dụng không ngờ của củ sâm cau rừng ngâm rượu
                      </a>
                    </h3>
                    <div className="clear" />{" "}
                  </div>{" "}
                </div>
              </div>
            </section>
            <section id="media_image-16" className="widget widget_media_image">
              <div className="widget-wrap">
                <a href="https://www.giaidocganplus.vn/">
                  <img
                    width={380}
                    height={300}
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2023/09/ctr-km.png"
                    className="image wp-image-72264 attachment-full size-full ls-is-cached lazyloaded"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2023/09/ctr-km.png"
                  />
                </a>
              </div>
            </section>
            <section id="text-8" className="widget widget_text">
              <div className="widget-wrap">
                {" "}
                <div className="textwidget">
                  <p>
                    <a
                      className="xem-bn-sam-tonu"
                      href="https://www.samtonu.com/chinh-hang"
                    >
                      <img
                        className="aligncenter size-full wp-image-69868 ls-is-cached lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2022/11/vien-uong-sam-to-nu.jpg"
                        alt
                        width={360}
                        height={360}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2022/11/vien-uong-sam-to-nu.jpg"
                      />
                    </a>
                  </p>
                </div>{" "}
              </div>
            </section>
            <section id="text-10" className="widget widget_text">
              <div className="widget-wrap">
                {" "}
                <div className="textwidget">
                  <p>
                    <a
                      className="xem-bn-giao-colam"
                      href="https://giaocolam.hettieuduong.com/cham-soc-suc-khoe"
                    >
                      <img
                        className="aligncenter size-full wp-image-63259 ls-is-cached lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2021/10/gcl-380x300-1.jpg"
                        alt
                        width={380}
                        height={300}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2021/10/gcl-380x300-1.jpg"
                      />
                    </a>
                  </p>
                </div>{" "}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
