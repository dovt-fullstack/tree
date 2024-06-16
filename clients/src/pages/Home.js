import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Row, Col, Image, Input } from "antd";
import MedicinalApi from "../api/MedicinalApi";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import HeaderHome from "./HeaderHome";
const { Search } = Input;
const { Header, Content } = Layout;
const banCanBiet = [
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg",
    name: "Danh lục cây thuốc",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg",
    name: "Tra cứu cây thuốc",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg",
    name: "Tra cứu theo bệnh",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg",
    name: "Tra cứu vị thuốc",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg",
    name: "Tra cứu bài thuốc",
  },
];

const Home = () => {
  const [medicinals, setMedicinals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMedicinals = async () => {
      try {
        const page = 1;
        const limit = 8;
        const data = await MedicinalApi.getAll(page, limit);
        setMedicinals(data.data);
      } catch (error) {
        console.error("Error fetching medicinals:", error);
      }
    };

    fetchMedicinals();
  }, []);
  const handleSearch = async (value) => {
    if (!value) {
      navigate("/list");
    } else {
      navigate({
        pathname: "/list",
        search: createSearchParams({
          q: value,
        }).toString(),
      });
    }
  };
  return (
    <div>
      <div>
        <HeaderHome />
      </div>
      <div>
        {/* <Layout className="layout">
          <div
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            <Search
              placeholder="Nhập tên dược liệu"
              enterButton
              style={{ width: "500px" }}
              onSearch={handleSearch}
            />
            <p>
              Từ khóa được tìm kiếm nhiều: Giảo cổ lam, Sâm cau, Hà thủ ô, Đông
              trùng hạ thảo
            </p>
          </div>
          <Content
            style={{
              padding: "0 50px",
              marginTop: "25px",
              backgroundColor: "white",
            }}
          >
            <section
              style={{ marginTop: "20px", marginBottom: "20px" }}
              id="ads_widget-4"
              className="widget caia_ads_widget"
            >
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">Dược liệu</h4>{" "}
                <div className="ads_content_widget">Được tìm kiếm nhiều</div>{" "}
              </div>
            </section>

            <div
              style={{ marginBottom: "45px" }}
              className="site-layout-content"
            >
              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
                {medicinals.map((medicinal) => (
                  <Col key={medicinal._id} xs={24} sm={12} md={6} lg={6}>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        style={{ width: "356px", height: "240px" }}
                        className="attachment-image-medium size-image-medium wp-post-image ls-is-cached lazyloaded"
                        src={medicinal.imageUrl}
                        alt={medicinal.name}
                      />
                      <Link to={`/medicinal/${medicinal._id}`}>
                        <p className="widget-item-title">{medicinal.name}</p>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
              <div
                style={{ marginTop: "25px" }}
                className="textwidget custom-html-widget"
              >
                <a href="https://tracuuduoclieu.vn/tra-cuu-duoc-lieu">
                  Xem toàn bộ
                </a>
              </div>
            </div>
          </Content>
          <div id="content-knows">
            <div className="wrap">
              <section id="ads_widget-2" className="widget caia_ads_widget">
                <div className="widget-wrap">
                  <h4 className="widget-title widgettitle">Bạn cần biết</h4>{" "}
                  <div className="ads_content_widget" />{" "}
                </div>
              </section>
              <section
                id="image-upload-widget-3"
                className="widget image-upload"
              >
                <div className="widget-wrap">
                  <div className="mainposts">
                    <a
                      href="https://tracuuduoclieu.vn/danh-luc-cay-thuoc/"
                      className="alignnone"
                    >
                      <img
                        className=" ls-is-cached lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg"
                        alt="box2"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg"
                      />
                    </a>
                    <h2>
                      <a href="https://tracuuduoclieu.vn/danh-luc-cay-thuoc/">
                        Danh lục cây thuốc
                      </a>
                    </h2>
                  </div>
                </div>
              </section>
              <section
                id="image-upload-widget-2"
                className="widget image-upload"
              >
                <div className="widget-wrap">
                  <div className="mainposts">
                    <a
                      href="https://tracuuduoclieu.vn/tra-cuu-duoc-lieu/"
                      className="alignnone"
                    >
                      <img
                        className=" ls-is-cached lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg"
                        alt="box1"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg"
                      />
                    </a>
                    <h2>
                      <a href="https://tracuuduoclieu.vn/tra-cuu-duoc-lieu/">
                        Tra cứu cây thuốc
                      </a>
                    </h2>
                  </div>
                </div>
              </section>
              <section
                id="image-upload-widget-4"
                className="widget image-upload"
              >
                <div className="widget-wrap">
                  <div className="mainposts">
                    <a
                      href="https://tracuuduoclieu.vn/tra-cuu-theo-benh/"
                      className="alignnone"
                    >
                      <img
                        className=" lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg"
                        alt="box3"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg"
                      />
                    </a>
                    <h2>
                      <a href="https://tracuuduoclieu.vn/tra-cuu-theo-benh/">
                        Tra cứu theo bệnh
                      </a>
                    </h2>
                  </div>
                </div>
              </section>
              <section
                id="image-upload-widget-9"
                className="widget image-upload"
              >
                <div className="widget-wrap">
                  <div className="mainposts">
                    <a
                      href="https://tracuuduoclieu.vn/tra-cuu-vi-thuoc"
                      className="alignnone"
                    >
                      <img
                        className=" lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg"
                        alt="vi-thuoc"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg"
                      />
                    </a>
                    <h2>
                      <a href="https://tracuuduoclieu.vn/tra-cuu-vi-thuoc">
                        Tra cứu vị thuốc
                      </a>
                    </h2>
                  </div>
                </div>
              </section>
              <section
                id="image-upload-widget-5"
                className="widget image-upload"
              >
                <div className="widget-wrap">
                  <div className="mainposts">
                    <a
                      href="https://tracuuduoclieu.vn/tra-cuu-bai-thuoc/"
                      className="alignnone"
                    >
                      <img
                        className=" lazyloaded"
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg"
                        alt="box4"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg"
                      />
                    </a>
                    <h2>
                      <a href="https://tracuuduoclieu.vn/tra-cuu-bai-thuoc/">
                        Tra cứu bài thuốc
                      </a>
                    </h2>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Layout> */}

        <div id="content-product">
          <div className="wrap">
            <section id="ads_widget-4" className="widget caia_ads_widget">
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">Dược liệu</h4>{" "}
                <div className="ads_content_widget">Được tìm kiếm nhiều</div>{" "}
              </div>
            </section>
            <section
              id="code_widget-2"
              className="code-shortcode_widget widget caia_code_widget"
            >
              <div className="widget-wrap">
                <div className="widget caia-post-list-widget">
                  {medicinals
                    ?.filter((items) => items.status == true)
                    .slice(0, 8)
                    .map((medicinal) => (
                      <div className="post-3927 dl type-dl">
                        <a
                          href={`/medicinal/${medicinal._id}`}
                          title="Cà gai leo"
                          className="alignnone"
                        >
                          <img
                            width={356}
                            height={240}
                            data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/06/ca-gai-leo-duoc-lieu-tue-linh2-356x240.jpg"
                            className="attachment-image-medium size-image-medium wp-post-image ls-is-cached lazyloaded"
                            src={medicinal.imageUrl}
                            alt={medicinal.name}
                          />
                        </a>
                        <h3 className="widget-item-title">
                          <a
                            href={`/medicinal/${medicinal._id}`}
                            title="Cà gai leo"
                          >
                            {medicinal.name}
                          </a>
                        </h3>
                      </div>
                    ))}
                </div>
              </div>
            </section>
            <section
              id="custom_html-3"
              className="widget_text widget widget_custom_html"
            >
              <div className="widget_text widget-wrap">
                <div className="textwidget custom-html-widget">
                  <a href="/list">Xem toàn bộ</a>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* phan1 */}
        {/* phan2 */}
        <div id="content-knows">
          <div className="wrap">
            <section id="ads_widget-2" className="widget caia_ads_widget">
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">Bạn cần biết</h4>{" "}
                <div className="ads_content_widget" />{" "}
              </div>
            </section>
            <section id="image-upload-widget-3" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/list" className="alignnone">
                    <img
                      className=" lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg"
                      alt="box2"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg"
                    />
                  </a>
                  <h2>
                    <a href="/list">Danh lục cây thuốc</a>
                  </h2>
                </div>
              </div>
            </section>
            <section id="image-upload-widget-2" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/list" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg"
                      alt="box1"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg"
                    />
                  </a>
                  <h2>
                    <a href="/list">Tra cứu cây thuốc</a>
                  </h2>
                </div>
              </div>
            </section>
            <section id="image-upload-widget-4" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/disease" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg"
                      alt="box3"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg"
                    />
                  </a>
                  <h2>
                    <a href="/disease">Tra cứu theo bệnh</a>
                  </h2>
                </div>
              </div>
            </section>
            <section id="image-upload-widget-9" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/list" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg"
                      alt="vi-thuoc"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg"
                    />
                  </a>
                  <h2>
                    <a href="/list">Tra cứu vị thuốc</a>
                  </h2>
                </div>
              </div>
            </section>
            <section id="image-upload-widget-5" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/list" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg"
                      alt="box4"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg"
                    />
                  </a>
                  <h2>
                    <a href="/list">Tra cứu bài thuốc</a>
                  </h2>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* phan3 */}
        <div id="content-new">
          <div className="wrap">
            <section
              id="caia-post-list-9"
              className="widget caia-post-list-widget"
            >
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">Bản tin dược liệu</h4>
                <div className="main-posts">
                  <div className="post-76802 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu entry">
                    <a
                      href="/"
                      title="Trinh nữ hoàng cung xạ đen: 2 thảo dược quý từ thiên nhiên"
                      className="alignnone"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/trinh-nu-hoang-cung-va-xa-den-360x240.jpg"
                        className="attachment-image-medium size-image-medium ls-is-cached lazyloaded"
                        alt="Trinh nữ hoàng cung xạ đen: 2 thảo dược quý từ thiên nhiên"
                        title="Trinh nữ hoàng cung xạ đen: 2 thảo dược quý từ thiên nhiên"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/trinh-nu-hoang-cung-va-xa-den-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="/"
                        title="Trinh nữ hoàng cung xạ đen: 2 thảo dược quý từ thiên nhiên"
                      >
                        Trinh nữ hoàng cung xạ đen: 2 thảo dược quý từ thiên
                        nhiên
                      </a>
                    </h3>
                    <p>
                      Trinh nữ hoàng cung và xạ đen là hai thảo dược quý mang
                      lại nhiều lợi ích cho sức khỏe, …{" "}
                      <a href="/" className="more-link">
                        Đọc thêm
                      </a>
                    </p>{" "}
                  </div>{" "}
                  <div className="post-76958 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu entry">
                    <a
                      href="/"
                      title="Chữa phụ khoa bằng trinh nữ hoàng cung có hiệu quả không?"
                      className="alignnone"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/chua-benh-phu-khoa-bang-trinh-nu-hoang-cung-360x240.jpg"
                        className="attachment-image-medium size-image-medium ls-is-cached lazyloaded"
                        alt="Chữa phụ khoa bằng trinh nữ hoàng cung có hiệu quả không?"
                        title="Chữa phụ khoa bằng trinh nữ hoàng cung có hiệu quả không?"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/chua-benh-phu-khoa-bang-trinh-nu-hoang-cung-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="/"
                        title="Chữa phụ khoa bằng trinh nữ hoàng cung có hiệu quả không?"
                      >
                        Chữa phụ khoa bằng trinh nữ hoàng cung có hiệu quả
                        không?
                      </a>
                    </h3>
                    <p>
                      Trinh nữ hoàng cung mang lại nhiều tác dụng tốt cho chị em
                      nên từ lâu đã được sử dụng cho …{" "}
                      <a href="/" className="more-link">
                        Đọc thêm
                      </a>
                    </p>{" "}
                  </div>{" "}
                  <div className="post-76911 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu entry">
                    <a
                      href="/"
                      title="Giải đáp chi tiết: Uống trinh nữ hoàng cung có nóng không?"
                      className="alignnone"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/uong-trinh-nua-hoang-cung-co-nong-khong-360x240.jpg"
                        className="attachment-image-medium size-image-medium ls-is-cached lazyloaded"
                        alt="Giải đáp chi tiết: Uống trinh nữ hoàng cung có nóng không?"
                        title="Giải đáp chi tiết: Uống trinh nữ hoàng cung có nóng không?"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/uong-trinh-nua-hoang-cung-co-nong-khong-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="/"
                        title="Giải đáp chi tiết: Uống trinh nữ hoàng cung có nóng không?"
                      >
                        Giải đáp chi tiết: Uống trinh nữ hoàng cung có nóng
                        không?
                      </a>
                    </h3>
                    <p>
                      Hiện nay có một số người cho rằng uống trinh nữ hoàng cung
                      gây nóng trong người. Vậy, thực …{" "}
                      <a href="/" className="more-link">
                        Đọc thêm
                      </a>
                    </p>{" "}
                  </div>{" "}
                  <div className="post-76938 post type-post status-publish format-standard has-post-thumbnail category-ban-tin-duoc-lieu entry">
                    <a
                      href="/"
                      title="Có nên đắp mặt nạ sữa ong chúa hàng ngày không?"
                      className="alignnone"
                    >
                      <img
                        width={360}
                        height={240}
                        data-src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/co-nen-dap-mat-na-sua-ong-chua-hang-ngay-khong-360x240.jpg"
                        className="attachment-image-medium size-image-medium ls-is-cached lazyloaded"
                        alt="Có nên đắp mặt nạ sữa ong chúa hàng ngày không?"
                        title="Có nên đắp mặt nạ sữa ong chúa hàng ngày không?"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2024/06/co-nen-dap-mat-na-sua-ong-chua-hang-ngay-khong-360x240.jpg"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="/"
                        title="Có nên đắp mặt nạ sữa ong chúa hàng ngày không?"
                      >
                        Có nên đắp mặt nạ sữa ong chúa hàng ngày không?
                      </a>
                    </h3>
                    <p>
                      Sữa ong chúa mang lại rất nhiều tác dụng có lợi cho sức
                      khỏe và làn da của mỗi người. Tuy …{" "}
                      <a href="/" className="more-link">
                        Đọc thêm
                      </a>
                    </p>{" "}
                  </div>{" "}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* phan4 */}
        <div id="content-doctor">
          <div className="wrap">
            <section id="ads_widget-3" className="widget caia_ads_widget">
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">Góc chuyên gia</h4>{" "}
                <div className="ads_content_widget" />{" "}
              </div>
            </section>
            <section id="image-upload-widget-6" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/doc1.png"
                      alt="doc1"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/doc1.png"
                    />
                  </a>
                  <h2>
                    <a href="/">TTND. GS. TS. NGUYỄN VĂN MÙI</a>
                  </h2>
                  <div className="noidung">
                    Nguyên PGĐ Kiêm chủ nhiệm bộ môn{" "}
                    <span>truyền nhiễm bệnh viện Quân y 103</span>
                  </div>
                  <a href="/" className="readmore">
                    Xem thêm
                  </a>
                </div>
              </div>
            </section>
            <section id="image-upload-widget-7" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2019/02/bs2.png"
                      alt="bs2"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2019/02/bs2.png"
                    />
                  </a>
                  <h2>
                    <a href="/">PGS. TS. NGUYỄN DUY THUẦN</a>
                  </h2>
                  <div className="noidung">
                    PGĐ Học viện Y dược học cổ truyền VN - Viện Trưởng Viện
                    nghiên cứu Y Dược Tuệ Tĩnh
                  </div>
                  <a href="/" className="readmore">
                    Xem thêm
                  </a>
                </div>
              </div>
            </section>
            <section id="image-upload-widget-8" className="widget image-upload">
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/doc3.png"
                      alt="doc3"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/doc3.png"
                    />
                  </a>
                  <h2>
                    <a href="/">PGS. TS. NGUYỄN THƯỢNG DONG</a>
                  </h2>
                  <div className="noidung">
                    Viện trưởng viện Dược liệu <span>Trung ương</span>
                  </div>
                  <a href="/" className="readmore">
                    Xem thêm
                  </a>
                </div>
              </div>
            </section>
            <section
              id="image-upload-widget-10"
              className="widget image-upload"
            >
              <div className="widget-wrap">
                <div className="mainposts">
                  <a href="/" className="alignnone">
                    <img
                      className=" ls-is-cached lazyloaded"
                      data-src="https://tracuuduoclieu.vn/wp-content/uploads/2024/01/gsp.png"
                      alt="GSP"
                      src="https://tracuuduoclieu.vn/wp-content/uploads/2024/01/gsp.png"
                    />
                  </a>
                  <h2>
                    <a href="/">TS. NGÔ ĐỨC PHƯƠNG</a>
                  </h2>
                  <div className="noidung">
                    Viện trưởng viện Khoa học Thuốc nam <span>Trung ương</span>
                  </div>
                  <a href="/" className="readmore">
                    Xem thêm
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* phan5 */}
      </div>
    </div>
  );
};

export default Home;
