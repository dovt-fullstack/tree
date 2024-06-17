import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const HeaderHome = () => {
  const [medicinals, setMedicinals] = useState("");
  const navigate = useNavigate();
  const handleSearch = async () => {
    if (!medicinals) {
      navigate("/list");
    } else {
      navigate({
        pathname: "/list",
        search: createSearchParams({
          q: medicinals,
        }).toString(),
      });
    }
  };

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
    <div>
      <div id="header-home">
        <div className="wrap">
          <section id="media_image-2" className="widget widget_media_image">
            <div className="widget-wrap">
              <a href="/">
                <img
                  width={145}
                  height={146}
                  data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/logo.png"
                  className="image wp-image-75 attachment-full size-full lazyloaded"
                  alt
                  style={{ maxWidth: "100%", height: "auto" }}
                  src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/logo.png"
                />
              </a>
            </div>
          </section>
          <section id="nav_menu-4" className="widget widget_nav_menu">
            <div className="widget-wrap">
              <div className="menu-main-menu-container">
                <ul id="menu-main-menu-1" className="menu">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-10">
                    <a href="/" aria-current="page" itemProp="url">
                      Trang chủ
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11">
                    <a href="/about" itemProp="url">
                      Giới thiệu
                    </a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-26">
                    <a href="/list" itemProp="url">
                      Danh sách dược liệu
                    </a>
                    <ul className="sub-menu">
                      {" "}
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-30">
                        <a href="/list" itemProp="url">
                          Tra cứu dược liệu
                        </a>
                      </li>{" "}
                      <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-28">
                        <a href="/disease" itemProp="url">
                          Tra cứu theo bệnh
                        </a>
                      </li>{" "}
                    </ul>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-17">
                    <a href="/news" itemProp="url">
                      Tin tức
                    </a>
                    <ul className="sub-menu">
                      {" "}
                      <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-12">
                        <a href="/news" itemProp="url">
                          Bản tin dược liệu
                        </a>
                      </li>{" "}
                    </ul>
                  </li>
                  <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-29409">
                    <a href="/list" itemProp="url">
                      Video
                    </a>
                  </li>

                  <li
                    id="menu-item-29013"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29013"
                  >
                    <a itemProp="url">
                      <span itemProp="name">
                        {" "}
                        {loggedIn && user && <>Xin chào, {user.name}</>}
                      </span>
                    </a>
                  </li>

                  <li
                    id="menu-item-29013"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29013"
                  >
                    <a itemProp="url">
                      <span onClick={() => navigate("/admin")} itemProp="name">
                        {" "}
                        {loggedIn && user && user.role === "admin" && (
                          <>Quản lý</>
                        )}
                      </span>
                    </a>
                  </li>
                  {/* <Menu.Item key="logout">
                  <a onClick={handleLogout}>Đăng xuất</a>
                </Menu.Item> */}
                  <li
                    id="menu-item-29013"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29013"
                  >
                    <a itemProp="url">
                      <span onClick={handleLogout} itemProp="name">
                        {" "}
                        {loggedIn && user && <>Đăng xuất</>}
                      </span>
                    </a>
                  </li>
                  <li
                    id="menu-item-29013"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29013"
                  >
                    <a itemProp="url">
                      <span onClick={() => navigate("/signup")} itemProp="name">
                        {!loggedIn && <>Đăng ký</>}
                      </span>
                    </a>
                  </li>
                  <li
                    id="menu-item-29013"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29013"
                  >
                    <a itemProp="url">
                      <span onClick={() => navigate("/login")} itemProp="name">
                        {!loggedIn && <>Đăng nhập</>}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section id="search-3" className="widget widget_search">
            <div className="widget-wrap">
              <h4 className="widget-title widgettitle">
                Từ khóa được tìm kiếm nhiều:{" "}
                <span>Giảo cổ lam, Sâm cau, Hà thủ ô, Đông trùng hạ thảo</span>
              </h4>
              <form
                className="search-form"
                itemProp="potentialAction"
                itemScope
                role="search"
              >
                <input
                  className="search-form-input"
                  type="search"
                  itemProp="query-input"
                  name="s"
                  onChange={(e) => setMedicinals(e.target.value)}
                  id="searchform-666cef1868ae29.68649089"
                  placeholder="Tên dược liệu cần tìm"
                  autoComplete="off"
                />
                <input
                  className="search-form-submit"
                  type="submit"
                  onClick={handleSearch}
                  defaultValue="Tra cứu"
                />
                <meta
                  itemProp="target"
                  content="https://tracuuduoclieu.vn/?s={s}"
                />
              </form>
            </div>
          </section>
          <section id="text-3" className="widget widget_text">
            <div className="widget-wrap">
              {" "}
              <div className="textwidget">
                <p>
                  Tra cứu khoa học – Thông tin đầy đủ, phong phú – Được tư vấn
                  bởi các chuyên giao hàng đầu
                </p>
              </div>{" "}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
