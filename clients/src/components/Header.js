import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname === "/", "pathname");
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
  // Hàm đăng xuất
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây (ví dụ: xóa thông tin người dùng khỏi localStorage và đặt state loggedIn và user về giá trị mặc định)
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    window.location.href = "/";
    // Sau khi đăng xuất, chuyển hướng về trang chủ hoặc trang khác tùy ý
    // window.location.href = "/"; // Thay đổi "/"" thành đường dẫn mong muốn
  };

  return (
    // <AntdHeader>
    //   <Menu
    //     theme="dark"
    //     mode="horizontal"
    //     style={{ display: "flex", justifyContent: "center" }}
    //   >
    //     <Menu.Item key="home">
    //       <Link to="/">Trang chủ</Link>
    //     </Menu.Item>
    //     <Menu.Item key="about">
    //       <Link to="/about">Giới thiệu</Link>
    //     </Menu.Item>
    //     <Menu.Item key="list">
    //       <Link to="/list">Danh sách dược liệu</Link>
    //     </Menu.Item>
    //     <Menu.Item key="expert">
    //       <Link to="/disease">Dược liệu theo bệnh</Link>
    //     </Menu.Item>
    //     <Menu.Item key="news">
    //       <Link to="/news">Tin tức</Link>
    //     </Menu.Item>
    //     <Menu.Item key="video">
    //       <Link to="/video">Video</Link>
    //     </Menu.Item>
    //     {/* Hiển thị mục Đăng nhập và Đăng ký nếu chưa đăng nhập */}
    //     {!loggedIn && (
    //       <>
    //         <Menu.Item key="login">
    //           <Link to="/login">Đăng nhập</Link>
    //         </Menu.Item>
    //         {/* <Menu.Item key="signup">
    //           <Link to="/signup">Đăng ký</Link>
    //         </Menu.Item> */}
    //       </>
    //     )}
    //     {/* Hiển thị tên người dùng và nút Đăng xuất nếu đã đăng nhập */}
    //     {loggedIn && user && (
    //       <>
    //         <Menu.Item key="username" disabled>
    //           Xin chào, {user.name}
    //         </Menu.Item>
    //         <Menu.Item key="logout">
    //           <a onClick={handleLogout}>Đăng xuất</a>
    //         </Menu.Item>
    //       </>
    //     )}
    //     {loggedIn && user && user.role === "admin" && (
    //       <Menu.Item key="add-article">
    //         <Link to="/admin">Quản lý</Link>
    //       </Menu.Item>
    //     )}
    //   </Menu>
    // </AntdHeader>
    <div>
      {pathname !== "/" && (
        <>
          <header
            className="site-header"
            itemScope
            itemType="https://schema.org/WPHeader"
          >
            <div className="wrap">
              <div className="title-area">
                <p className="site-title" itemProp="headline">
                  <a href="/list" title="Tra cứu dược liệu">
                    Tra cứu dược liệu
                  </a>
                </p>
              </div>
              <div className="widget-area header-widget-area">
                <section id="search-2" className="widget widget_search">
                  <div className="widget-wrap">
                    <h4 className="widget-title widgettitle">
                      Từ khóa được tìm kiếm nhiều:{" "}
                      <span>
                        Giảo cổ lam, Sâm cau, Hà thủ ô, Đông trùng hạ thảo
                      </span>
                    </h4>
                  </div>
                </section>
              </div>
            </div>
          </header>
          <nav
            className="nav-primary"
            aria-label="Main"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            <div className="wrap">
              <ul
                id="menu-main-menu"
                className="menu genesis-nav-menu menu-primary"
              >
                <li
                  id="menu-item-10"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-10"
                >
                  <a href="/" itemProp="url">
                    <span itemProp="name">Trang chủ</span>
                  </a>
                </li>
                <li
                  id="menu-item-11"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11"
                >
                  <a href="/about" itemProp="url">
                    <span itemProp="name">Giới thiệu</span>
                  </a>
                </li>
                <li
                  id="menu-item-26"
                  className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-26"
                >
                  <a itemProp="url">
                    <span itemProp="name">Danh sách dược liệu</span>
                  </a>
                  <ul className="sub-menu">
                    <li
                      id="menu-item-29"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"
                    >
                      <a href="/list" itemProp="url">
                        <span itemProp="name">Danh lục cây thuốc</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-30"
                      className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-18 current_page_item menu-item-30"
                    >
                      <a href="/list" aria-current="page" itemProp="url">
                        <span itemProp="name">Tra cứu dược liệu</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-28"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-28"
                    >
                      <a href="/disease" itemProp="url">
                        <span itemProp="name">Tra cứu theo bệnh</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-27"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-27"
                    >
                      <a href="/list" itemProp="url">
                        <span itemProp="name">Tra cứu bài thuốc</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-49190"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-49190"
                    >
                      <a href="/list" itemProp="url">
                        <span itemProp="name">Tra cứu vị thuốc</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-17"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-17"
                >
                  <a itemProp="url">
                    <span itemProp="name">Tin tức</span>
                  </a>
                  <ul className="sub-menu">
                    <li
                      id="menu-item-12"
                      className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-12"
                    >
                      <a href="/list" itemProp="url">
                        <span itemProp="name">Bản tin dược liệu</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-14"
                      className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-14"
                    >
                      <a href="/list" itemProp="url">
                        <span itemProp="name">Nghiên cứu khoa học</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-15"
                      className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-15"
                    >
                      <a href="/list" itemProp="url">
                        <span itemProp="name">Phát triển dược liệu</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  id="menu-item-29409"
                  className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-29409"
                >
                  <a href="/video" itemProp="url">
                    <span itemProp="name">Video</span>
                  </a>
                </li>
                <li
                  id="menu-item-29013"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29013"
                >
                  <a href="/list" itemProp="url">
                    <span itemProp="name">Chuyên gia dược liệu</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Header;
