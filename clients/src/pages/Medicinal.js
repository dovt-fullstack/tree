import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Layout,
  Row,
  Col,
  Image,
  Pagination,
  Input,
  message,
} from "antd";
import { Link, useSearchParams } from "react-router-dom";
import MedicinalApi from "../api/MedicinalApi";

const { Search } = Input;
const { Header, Content } = Layout;

const Medicinal = () => {
  const [medicinals, setMedicinals] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("q");

  useEffect(() => {
    const fetchMedicinals = async () => {
      try {
        const data = await MedicinalApi.getAll(currentPage, pageSize);
        setMedicinals(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching medicinals:", error);
      }
    };

    fetchMedicinals();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = async (value) => {
    if (!value) {
      message.error("Chưa nhập dữ liệu");
      return;
    }
    try {
      const response = await MedicinalApi.search(value, currentPage, pageSize);
      setMedicinals(response.data);
      setTotal(response.total);
      setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi tìm kiếm thành công
    } catch (error) {
      console.error("Error searching for medicinals:", error);
    }
  };
  useEffect(() => {
    if (querySearch) {
      const decodedQuery = decodeURIComponent(querySearch.trim());
      setSearchKeyword(decodedQuery);
      handleSearch(decodedQuery);
      setTimeout(() => {
        handleSearch(decodedQuery);
      }, 450);
    }
  }, [querySearch]);
  return (
    <>
      <div className="breadcrumb">
        <div className="wrap">
          <h2 className="archive-heading">Tra cứu dược liệu</h2>
          <span
            className="breadcrumb-link-wrap"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a className="breadcrumb-link" href="/" itemProp="item">
              <span className="breadcrumb-link-text-wrap" itemProp="name">
                Trang chủ
              </span>
            </a>
            <meta itemProp="position" content={1} />
          </span>
          <span className="label"> »</span>Tra cứu dược liệu
        </div>
      </div>
      <div className="site-inner">
        <div className="content-sidebar-wrap">
          <main className="content">
            <h1 className="entry-title" itemProp="headline">
              Tra cứu dược liệu
            </h1>
            <div id="form-search">
              {" "}
              <form className="searchform search-form" role="search">
                <input
                  type="text"
                  placeholder="Nhập tên thuốc hoặc tên bệnh để tra cứu"
                  name="q"
                  className="s search-input duoclieu"
                  autoComplete="off"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <input
                  onClick={handleSearch}
                  type="submit"
                  className="searchsubmit search-submit"
                  defaultValue="Tra cứu"
                />
              </form>
            </div>

            <div id="list-dl">
              {medicinals
                ?.filter((items) => items.status == true)
                .map((medicinal) => (
                  <div className="dl">
                    <a href={`/medicinal/${medicinal._id}`}>
                      <img
                        width={247}
                        height={360}
                        src={medicinal.imageUrl}
                        alt={medicinal.name}
                        className="attachment-thumbnail size-thumbnail wp-post-image"
                      />
                    </a>
                    <h2>
                      <a href="https://tracuuduoclieu.vn/cao-cang-bac-bo.html">
                        {medicinal.name}
                      </a>
                    </h2>
                  </div>
                ))}
              <div className="archive-pagination pagination">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={total}
                  onChange={handlePageChange} // Callback khi chuyển trang
                  showSizeChanger={true} // Cho phép thay đổi kích thước trang
                  onShowSizeChange={handlePageChange} // Callback khi thay đổi kích thước trang
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                />
              </div>
            </div>
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
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner1.jpg"
                    className="image wp-image-95  attachment-full size-full"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
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
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner2.jpg"
                    className="image wp-image-96  attachment-full size-full"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
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
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner3.jpg"
                    className="image wp-image-97  attachment-full size-full"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
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
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/banner4.jpg"
                    className="image wp-image-98  attachment-full size-full"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </a>
              </div>
            </section>
            <section
              id="caia-post-list-3"
              className="widget caia-post-list-widget"
            >
              <div className="widget-wrap">
                <h4 className="widget-title widgettitle">
                  Dược liệu được quan tâm
                </h4>
                <div className="main-posts">
                  <div className="post-50985 dl type-dl status-publish has-post-thumbnail cmdl-benh-mun-nhot-man-ngua cmdl-benh-phu-nu entry">
                    <a
                      href="https://tracuuduoclieu.vn/anh-thao.html"
                      title="Anh thảo"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={360}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2020/10/anh-thao-1-360x360.jpg"
                        className="attachment-thumbnail size-thumbnail"
                        alt="Anh thảo"
                        title="Anh thảo"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/anh-thao.html"
                        title="Anh thảo"
                      >
                        Anh thảo
                      </a>
                    </h3>
                    Hình ảnh cây Anh thảo Đặc điểm mô tả Cây cỏ, sống 2 năm,
                    chi...
                    <div className="clear" />
                  </div>
                  {/*end post_class()*/}
                  <div className="post-27739 dl type-dl status-publish has-post-thumbnail cmdl-thuoc-bo-nguon-goc-thao-moc entry">
                    <a
                      href="https://tracuuduoclieu.vn/sam-to-nu.html"
                      title="Sâm tố nữ"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={250}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2019/02/sam-to-nu-360x250.jpg"
                        className="attachment-thumbnail size-thumbnail"
                        alt="Sâm tố nữ"
                        title="Sâm tố nữ"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/sam-to-nu.html"
                        title="Sâm tố nữ"
                      >
                        Sâm tố nữ
                      </a>
                    </h3>
                    Sâm tố nữ lần đầu tiên được tìm thấy ở phía Bắc Thái Lan,
                    My...
                    <div className="clear" />
                  </div>
                  {/*end post_class()*/}
                  <div className="post-29705 dl type-dl status-publish has-post-thumbnail cmdl-an-than-gay-ngu-tran-kinh cmdl-benh-cao-huyet-ap cmdl-benh-tieu-duong cmdl-benh-tieu-hoa cmdl-thuoc-bo-nguon-goc-thao-moc entry">
                    <a
                      href="https://tracuuduoclieu.vn/giao-co-lam.html"
                      title="Giảo cổ lam"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={256}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2019/02/giao-co-lam-1-360x256.jpg"
                        className="attachment-thumbnail size-thumbnail"
                        alt="Giảo cổ lam"
                        title="Giảo cổ lam"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/giao-co-lam.html"
                        title="Giảo cổ lam"
                      >
                        Giảo cổ lam
                      </a>
                    </h3>
                    Hình 1: Giảo cổ lam (Gynostemma pentaphyllum) Mô tả cây
                    Giảo...
                    <div className="clear" />
                  </div>
                  {/*end post_class()*/}
                  <div className="post-3936 dl type-dl status-publish has-post-thumbnail cmdl-benh-nam-gioi cmdl-thuoc-bo-nguon-goc-thao-moc entry">
                    <a
                      href="https://tracuuduoclieu.vn/sam-cau.html"
                      title="Sâm cau"
                      className="alignleft"
                    >
                      <img
                        width={360}
                        height={360}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2018/05/sam-cau-4-360x360.jpg"
                        className="attachment-thumbnail size-thumbnail"
                        alt="Sâm cau"
                        title="Sâm cau"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/sam-cau.html"
                        title="Sâm cau"
                      >
                        Sâm cau
                      </a>
                    </h3>
                    Là cây thảo, sống lâu năm, cao 20 - 30 cm, có khi hơn. Thân
                    ...
                    <div className="clear" />
                  </div>
                  {/*end post_class()*/}
                  <div className="post-3927 dl type-dl status-publish has-post-thumbnail cmdl-benh-ve-gan cmdl-dap-vet-thuong-ran-ret-can entry">
                    <a
                      href="https://tracuuduoclieu.vn/ca-gai-leo.html"
                      title="Cà gai leo"
                      className="alignleft"
                    >
                      <img
                        width={356}
                        height={266}
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2018/06/ca-gai-leo-duoc-lieu-tue-linh2.jpg"
                        className="attachment-thumbnail size-thumbnail"
                        alt="Cà gai leo"
                        title="Cà gai leo"
                      />
                    </a>
                    <h3 className="widget-item-title">
                      <a
                        href="https://tracuuduoclieu.vn/ca-gai-leo.html"
                        title="Cà gai leo"
                      >
                        Cà gai leo
                      </a>
                    </h3>
                    Cây nhỏ leo, sống nhiều năm, dài khoảng 1 m hay hơn. Thân
                    hó...
                    <div className="clear" />
                  </div>
                  {/*end post_class()*/}
                </div>
              </div>
            </section>
            <section id="media_image-16" className="widget widget_media_image">
              <div className="widget-wrap">
                <a href="https://www.giaidocganplus.vn/">
                  <img
                    width={380}
                    height={300}
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2023/09/ctr-km.png"
                    className="image wp-image-72264  attachment-full size-full"
                    alt
                    style={{ maxWidth: "100%", height: "auto" }}
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
                        className="aligncenter size-full wp-image-69868"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2022/11/vien-uong-sam-to-nu.jpg"
                        alt
                        width={360}
                        height={360}
                      />
                    </a>
                  </p>
                </div>
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
                        className="aligncenter size-full wp-image-63259"
                        src="https://tracuuduoclieu.vn/wp-content/uploads/2021/10/gcl-380x300-1.jpg"
                        alt
                        width={380}
                        height={300}
                      />
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

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
            onSearch={handleSearch}
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            enterButton
            style={{ width: "500px" }}
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
          <h1 style={{ textAlign: "center" }}>Tất cả Dược Liệu</h1>
          <div className="site-layout-content">
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
              {medicinals
                ?.filter((items) => items.status == true)
                .map((medicinal) => (
                  <Col key={medicinal._id} xs={24} sm={12} md={6} lg={6}>
                    <div style={{ textAlign: "center" }}>
                      <Image
                        style={{ width: "356px", height: "240px" }}
                        className="attachment-image-medium size-image-medium wp-post-image ls-is-cached lazyloaded"
                        src={medicinal.imageUrl}
                        alt={medicinal.name}
                      />
                      <Link to={`/medicinal/${medicinal._id}`}>
                        <p style={{ fontWeight: "bold" }}>{medicinal.name}</p>
                      </Link>
                    </div>
                  </Col>
                ))}
            </Row>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange} // Callback khi chuyển trang
                showSizeChanger={true} // Cho phép thay đổi kích thước trang
                onShowSizeChange={handlePageChange} // Callback khi thay đổi kích thước trang
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </div>
          </div>
        </Content>
      </Layout> */}
    </>
  );
};

export default Medicinal;
