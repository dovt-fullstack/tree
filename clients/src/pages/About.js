import React from "react";
import { Layout, Image, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const About = () => {
  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      ></Content>
      <Content
        style={{
          padding: "0 150px",
          marginTop: "25px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Giới thiệu</h1>
        <div className="site-layout-content">
          <p>
            Thiên nhiên Việt Nam là một kho tàng tài nguyên vô giá với nguồn
            dược liệu đa dạng, bao gồm nhiều loại cây, động vật và khoáng vật
            quý hiếm. Sự đa dạng về động thực vật của Việt Nam đứng hàng thứ hai
            trên thế giới (chỉ sau rừng mưa Amazon) và có nhiều loài thực vật
            đặc hữu. Nền y học cổ truyền Việt Nam dựa trên kinh nghiệm thực tiễn
            được tích luỹ qua hàng nghìn năm đã biết sử dụng nhiều loại dược
            liệu tự nhiên này để làm thuốc chữa bệnh. Tuy nhiên, các tri thức y
            học dân gian thường được các thầy lang “giấu bài” hoặc “tung hoả mù”
            về thông tin dẫn đến việc sử dụng cây thuốc nam trong nhân dân thiếu
            đi tính chính thống và chuẩn mực.
          </p>
          <p>
            Các tài liệu giới thiệu về Dược liệu Việt Nam chuẩn mực có thể kể
            đến: Dược Điển Việt Nam, Từ điển Cây thuốc VN của GS.TS Võ Văn Chi,
            Những Cây thuốc và Vị thuốc Việt Nam của Đỗ Tất Lợi, Cây thuốc và
            Động vật làm thuốc ở Việt Nam của tâp thể các GS.TS Viện Dược liệu
            TƯ, Danh lục Cây thuốc Việt Nam của VDL, Một số đầu sách về Cây
            thuốc địa phương như Cây Thuốc Nghệ An……
          </p>
          <p>
            Tuy nhiên việc tiếp cận các nguồn tài liệu trên rất bất cập. Chủ yếu
            do giá thành in ấn đắt đỏ và tính phổ cập thấp. Hơn nữa lại rất ít
            hình ảnh thực tế của loại cây cần tìm hiểu. Với mong muốn mang lại
            những thông tin chính xác, chuẩn mực, dễ tiếp cận, đồng thời quảng
            bá sâu rộng nguồn dược liệu quý Việt Nam đến với mọi người dân có
            nhu cầu tìm hiểu, Website Tracuuduoclieu.vn đã bắt tay xây dựng Danh
            lục Cây thuốc điện tử đầu tiên tại Việt Nam. Điều vô cùng đặc biệt
            và quý giá là Danh lục Cây thuốc điện tử này là Danh lục đầu tiên và
            duy nhất có đủ hình ảnh thực tế của các loài dược liệu được giới
            thiệu, giúp bạn đọc quan tâm dễ dàng so sánh, đối chiếu tránh nhầm
            lẫn. Đây cũng là Danh lục cây thuốc đạt độ chính xác cao nhất về
            danh pháp Thực vật. Một công trình để đời của cố Cử Nhân Ngô Văn
            Trại, một bậc thầy về Danh pháp thực vật, nguyên là cán bộ Phòng tài
            nguyên Viện Dược liệu TƯ.
          </p>
          <div className="centered-content">
            <p>
              <Image
                src="https://tracuuduoclieu.vn/wp-content/uploads/2020/07/ngo-van-trai.png"
                alt="Cử Nhân Ngô Văn Trại"
                width={500}
              />
            </p>
            <p>Cố Cử Nhân Ngô Văn Trại</p>
          </div>
          <p>
            Ngoài ra Website: tracuuduoclieu.vn này còn tổng hợp tài liệu từ
            cuốn “Cây thuốc và động vật làm thuốc Việt Nam”, “Những cây thuốc và
            vị thuốc Việt Nam” cùng ý kiến tham vấn của các chuyên gia Dược Liệu
            hàng đầu để cung cấp thông tin khái quát về hơn 4000 loại dược liệu
            và thông tin chi tiết của hơn 1400 loại dược liệu quý. Đặc biệt,
            phần hình ảnh cây thuốc được chọn lọc kĩ lưỡng bởi các Giáo sư tiến
            sỹ đầu ngành về Định danh thực vật giúp phân biệt rõ ràng, tránh
            nhầm lẫn giữa các loại dược liệu.
          </p>
          <div className="centered-content">
            <p>
              <Image
                src="https://tracuuduoclieu.vn/wp-content/uploads/2021/08/gt-1.jpg"
                alt="nghien cuu"
                width={500}
              />
            </p>
          </div>
          <p style={{ fontWeight: "bold" }}>
            Để thuận tiện cho người nghiên cứu, thông tin dược liệu được chúng
            tôi chia ra làm 5 phần chính:
          </p>
          <ol>
            <li>
              <strong>Danh lục cây thuốc:</strong> Thông tin chính thống, chuẩn
              mực nhất về Cây thuốc Việt Nam với gần 4000 loài với hình ảnh xác
              thực nhất. Tên Khoa học của các loài thực vật trong Danh lục này
              được định danh theo quy chuẩn mới nhất trên thế giới về định danh
              thực vật. Đây là tài liệu Gốc của trang website:
              tracuuduoclieu.vn. Danh lục cây thuốc giúp người quan tâm tìm hiểu
              nhìn đúng cây thuốc, xác định đúng loài, tránh nhầm lẫn. Đây là
              công trình để đời của cố CN. Ngô Văn Trại
            </li>
            <li>
              <strong>Tra cứu Dược liệu:</strong> Cập nhật thông tin chi tiết
              hơn về mỗi loại cây, loại động vật nhằm giúp người đọc tìm hiểu
              sâu hơn về sinh thái, trồng trọt, nghiên cứu khoa học, công dụng,
              tác dụng, cách dùng và lưu ý khi dùng của hơn 1400 loài phổ biến.
              Thông tin này được lấy từ cuốn Cây thuốc và Động vật làm thuốc ở
              Việt Nam của Viện dược liệu TƯ.
            </li>
            <li>
              <strong>Tra cứu theo bệnh:</strong> Gồm 23 nhóm bệnh thường gặp
              (được phân chia theo y học cổ truyền), đi sâu vào các nhóm là các
              dược liệu cùng cách sử dụng chúng để điều trị bệnh. Thông tin được
              lấy từ cuốn Dược thư Quốc gia.
            </li>
            <li>
              <strong>Tra cứu theo Vị thuốc:</strong> Tại trang này, độc giả sẽ
              được rõ hơn về các vị thuốc từ cây thuốc, cách bào chế, tính vị
              quy kinh, công dụng và cách dùng, kiêng kị.
            </li>
            <li>
              <strong>Tra cứu Bài thuốc:</strong> Cập nhật thông tin về các bài
              thuốc quý được lưu truyền từ thời ông cha ta để lại hoặc được sưu
              tầm từ các danh y nổi tiếng Việt Nam.
            </li>
          </ol>
          <p>
            Bên cạnh đó, thông tin về các loài cây thuộc diện quý hiếm, những
            loài cây mới phát hiện, những công trình nghiên cứu mới về dược
            liệu, các công dụng được chứng minh bởi nghiên cứu lâm sàng cũng sẽ
            được chúng tôi cập nhật liên tục tại phần “Bản tin dược liệu” nhằm
            cung cấp kiến thức một cách đầy đủ và hữu ích nhất.
          </p>
          <p>
            Hi vọng rằng, Website Tracuuduoclieu.vn sẽ góp phần giúp đại bộ phận
            người dân nhìn đúng và dùng đúng cây thuốc, giúp việc bảo tồn các
            cây thuốc quý hiếm, là nơi trao đổi thông tin và tri thức sử dụng
            cây thuốc.
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default About;
