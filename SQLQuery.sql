USE [master]
GO
/****** Object:  Database [DentalCentreManagement]    Script Date: 12/10/2024 5:59:00 PM ******/
CREATE DATABASE [DentalCentreManagement]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DentalCentreManagement', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DentalCentreManagement.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DentalCentreManagement_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DentalCentreManagement_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DentalCentreManagement] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DentalCentreManagement].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DentalCentreManagement] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET ARITHABORT OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DentalCentreManagement] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DentalCentreManagement] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DentalCentreManagement] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DentalCentreManagement] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DentalCentreManagement] SET  MULTI_USER 
GO
ALTER DATABASE [DentalCentreManagement] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DentalCentreManagement] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DentalCentreManagement] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DentalCentreManagement] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DentalCentreManagement] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DentalCentreManagement] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DentalCentreManagement] SET QUERY_STORE = OFF
GO
USE [DentalCentreManagement]
GO
/****** Object:  Table [dbo].[AnhSauDieuTri]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnhSauDieuTri](
	[MaAnh] [int] IDENTITY(1000,1) NOT NULL,
	[MaCTHSDT] [int] NULL,
	[MaBN] [int] NULL,
	[Anh] [varbinary](max) NULL,
	[MoTa] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaAnh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BenhNhan]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BenhNhan](
	[MaBN] [int] IDENTITY(1000,1) NOT NULL,
	[TenBN] [nvarchar](100) NULL,
	[SoDienThoai] [nvarchar](15) NULL,
	[CCCD] [nvarchar](12) NULL,
	[DiaChi] [nvarchar](255) NULL,
	[GioiTinh] [nvarchar](5) NULL,
	[NgaySinh] [nvarchar](10) NULL,
	[TienSuBenhLy] [nvarchar](255) NULL,
	[TongChi] [decimal](18, 2) NULL,
	[ChietKhau] [decimal](18, 2) NULL,
	[DaThanhToan] [decimal](18, 2) NULL,
	[CongNo] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaBN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiNhanh]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiNhanh](
	[MaCN] [int] IDENTITY(1000,1) NOT NULL,
	[TenCN] [nvarchar](100) NULL,
	[DiaChi] [nvarchar](255) NULL,
	[MoTa] [nvarchar](255) NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaCN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietHSDT]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietHSDT](
	[MaCTHSDT] [int] IDENTITY(1000,1) NOT NULL,
	[MaBN] [int] NULL,
	[LyDoKham] [nvarchar](255) NULL,
	[ChanDoan] [nvarchar](255) NULL,
	[NgayDieuTri] [nvarchar](10) NULL,
	[MaNhaSi] [int] NULL,
	[MaChiNhanh] [int] NULL,
	[GhiChu] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaCTHSDT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietThanhToan]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietThanhToan](
	[MaHD] [int] NULL,
	[NgayThanhToan] [nvarchar](10) NULL,
	[SoTienThanhToan] [decimal](18, 2) NULL,
	[HinhThucThanhToan] [nvarchar](50) NULL,
	[MaCTTT] [int] IDENTITY(1000,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaCTTT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DichVu]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DichVu](
	[MaDV] [int] IDENTITY(1000,1) NOT NULL,
	[TenDV] [nvarchar](100) NULL,
	[LoaiDV] [nvarchar](50) NULL,
	[GiaThapNhat] [decimal](18, 2) NULL,
	[GiaCaoNhat] [decimal](18, 2) NULL,
	[MoTa] [nvarchar](255) NULL,
	[ChinhSachBaoHanh] [nvarchar](255) NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DichVuDaSuDung]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DichVuDaSuDung](
	[MaCTHSDT] [int] NULL,
	[MaDV] [int] NULL,
	[GiaDichVu] [decimal](18, 2) NULL,
	[SoLuong] [int] NULL,
	[ChietKhau] [decimal](18, 2) NULL,
	[DonGia]  AS ([GiaDichVu]*[SoLuong]),
	[GhiChu] [nvarchar](255) NULL,
	[TaiKham] [nvarchar](20) NULL,
	[MaDVSD] [int] IDENTITY(1000,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDVSD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GiamGia]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GiamGia](
	[MaGiamGia] [int] IDENTITY(1000,1) NOT NULL,
	[TenGiamGia] [nvarchar](100) NULL,
	[SoTienGiam] [decimal](18, 2) NULL,
	[PhanTramGiam] [decimal](5, 2) NULL,
	[DieuKienApDung] [nvarchar](255) NULL,
	[NgayBatDau] [nvarchar](10) NULL,
	[NgayKetThuc] [nvarchar](10) NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaGiamGia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDon]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDon](
	[MaHD] [int] IDENTITY(1000,1) NOT NULL,
	[MaBN] [int] NULL,
	[MaNV] [int] NULL,
	[MaCTHSDT] [int] NULL,
	[MaGiamGia] [int] NULL,
	[NgayLap] [nvarchar](10) NULL,
	[SoTienGiam] [decimal](18, 2) NULL,
	[PhanTramGiam] [decimal](5, 2) NULL,
	[LyDoGiam] [nvarchar](255) NULL,
	[SoTienDaThanhToan] [decimal](18, 2) NULL,
	[SoTienConNo] [decimal](18, 2) NULL,
	[TinhTrang] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaHD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LichHen]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichHen](
	[MaLichHen] [int] IDENTITY(1000,1) NOT NULL,
	[MaChiNhanh] [int] NULL,
	[MaBN] [int] NULL,
	[MaNS] [int] NULL,
	[HoTen] [nvarchar](100) NULL,
	[SoDienThoai] [nvarchar](15) NULL,
	[DiaChi] [nvarchar](255) NULL,
	[Email] [nvarchar](100) NULL,
	[Ngay] [nvarchar](10) NULL,
	[Gio] [nvarchar](5) NULL,
	[LyDoKham] [nvarchar](255) NULL,
	[GhiChu] [nvarchar](255) NULL,
	[LoaiLichHen] [nvarchar](50) NULL,
	[TrangThai] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLichHen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LuongThuong]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LuongThuong](
	[MaLT] [int] IDENTITY(1000,1) NOT NULL,
	[LoaiLT] [nvarchar](255) NOT NULL,
	[LoaiNV] [nvarchar](255) NOT NULL,
	[MaNV] [int] NULL,
	[Nam] [int] NOT NULL,
	[Thang] [int] NOT NULL,
	[Tien] [decimal](18, 2) NOT NULL,
	[MaCN] [int] NULL,
	[GhiChu] [nvarchar](max) NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhanVien](
	[MaNV] [int] IDENTITY(1000,1) NOT NULL,
	[TenNV] [nvarchar](100) NULL,
	[SoDienThoai] [nvarchar](15) NULL,
	[Email] [nvarchar](100) NULL,
	[CCCD] [nvarchar](12) NULL,
	[GioiTinh] [nvarchar](5) NULL,
	[NgaySinh] [nvarchar](10) NULL,
	[ChucVu] [nvarchar](50) NULL,
	[BangCap] [nvarchar](50) NULL,
	[KinhNghiem] [int] NULL,
	[LuongCoBan] [decimal](18, 2) NULL,
	[MaChiNhanh] [int] NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhanHoi]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanHoi](
	[MaPH] [int] IDENTITY(1000,1) NOT NULL,
	[MaChiNhanh] [int] NULL,
	[Ngay] [nvarchar](10) NULL,
	[Gio] [nvarchar](5) NULL,
	[NoiDung] [nvarchar](500) NULL,
	[MaBN] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[MaTK] [nvarchar](36) NOT NULL,
	[MaNguoiDung] [nvarchar](12) NULL,
	[Ten] [nvarchar](100) NULL,
	[SoDienThoai] [nvarchar](15) NULL,
	[Tuoi] [int] NULL,
	[Email] [nvarchar](100) NULL,
	[MatKhau] [nvarchar](255) NULL,
	[XacNhan] [int] NULL,
	[LoaiNguoiDung] [nvarchar](10) NULL,
	[Token] [nvarchar](max) NULL,
	[MaNV] [int] NULL,
 CONSTRAINT [PK_TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[MaTK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Thuoc]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Thuoc](
	[MaThuoc] [int] IDENTITY(1000,1) NOT NULL,
	[TenThuoc] [nvarchar](100) NULL,
	[MaChiNhanh] [int] NULL,
	[NgayNhap] [nvarchar](10) NULL,
	[SoLuongNhap] [int] NULL,
	[SoLuongTonKho] [int] NULL,
	[DonGiaNhap] [decimal](18, 2) NULL,
	[DonGiaBan] [decimal](18, 2) NULL,
	[HanSuDung] [nvarchar](10) NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaThuoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThuocDaKe]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThuocDaKe](
	[MaCTHSDT] [int] NULL,
	[MaThuoc] [int] NULL,
	[SoLuong] [int] NULL,
	[Gia] [decimal](18, 2) NULL,
	[DonGia]  AS ([Gia]*[SoLuong]),
	[GhiChu] [nvarchar](255) NULL,
	[MaTDK] [int] IDENTITY(1000,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTDK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VatTu]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VatTu](
	[MaVT] [int] IDENTITY(1000,1) NOT NULL,
	[TenVT] [nvarchar](100) NULL,
	[MaChiNhanh] [int] NULL,
	[NgayNhap] [nvarchar](10) NULL,
	[SoLuongNhap] [int] NULL,
	[SoLuongTonKho] [int] NULL,
	[DonGiaNhap] [decimal](18, 2) NULL,
	[An] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaVT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VatTuDaSuDung]    Script Date: 12/10/2024 5:59:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VatTuDaSuDung](
	[MaVatTu] [int] NULL,
	[MaChiNhanh] [int] NULL,
	[NgaySuDung] [nvarchar](10) NULL,
	[SoLuong] [int] NULL,
	[An] [bit] NULL,
	[MaVTDSD] [int] IDENTITY(1000,1) NOT NULL,
 CONSTRAINT [PK_VatTuDaSuDung] PRIMARY KEY CLUSTERED 
(
	[MaVTDSD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ChiNhanh] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[DichVu] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[GiamGia] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[LuongThuong] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[TaiKhoan] ADD  DEFAULT (newid()) FOR [MaTK]
GO
ALTER TABLE [dbo].[Thuoc] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[VatTu] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[VatTuDaSuDung] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[AnhSauDieuTri]  WITH CHECK ADD FOREIGN KEY([MaCTHSDT])
REFERENCES [dbo].[ChiTietHSDT] ([MaCTHSDT])
GO
ALTER TABLE [dbo].[ChiTietHSDT]  WITH CHECK ADD FOREIGN KEY([MaNhaSi])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[ChiTietHSDT]  WITH CHECK ADD FOREIGN KEY([MaBN])
REFERENCES [dbo].[BenhNhan] ([MaBN])
GO
ALTER TABLE [dbo].[ChiTietThanhToan]  WITH CHECK ADD FOREIGN KEY([MaHD])
REFERENCES [dbo].[HoaDon] ([MaHD])
GO
ALTER TABLE [dbo].[DichVuDaSuDung]  WITH CHECK ADD FOREIGN KEY([MaCTHSDT])
REFERENCES [dbo].[ChiTietHSDT] ([MaCTHSDT])
GO
ALTER TABLE [dbo].[DichVuDaSuDung]  WITH CHECK ADD FOREIGN KEY([MaDV])
REFERENCES [dbo].[DichVu] ([MaDV])
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD FOREIGN KEY([MaBN])
REFERENCES [dbo].[BenhNhan] ([MaBN])
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD FOREIGN KEY([MaCTHSDT])
REFERENCES [dbo].[ChiTietHSDT] ([MaCTHSDT])
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD FOREIGN KEY([MaGiamGia])
REFERENCES [dbo].[GiamGia] ([MaGiamGia])
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[LichHen]  WITH CHECK ADD FOREIGN KEY([MaBN])
REFERENCES [dbo].[BenhNhan] ([MaBN])
GO
ALTER TABLE [dbo].[LichHen]  WITH CHECK ADD FOREIGN KEY([MaNS])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[PhanHoi]  WITH CHECK ADD FOREIGN KEY([MaBN])
REFERENCES [dbo].[BenhNhan] ([MaBN])
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_TaiKhoan_NhanVien] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [FK_TaiKhoan_NhanVien]
GO
ALTER TABLE [dbo].[Thuoc]  WITH CHECK ADD FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[ThuocDaKe]  WITH CHECK ADD FOREIGN KEY([MaCTHSDT])
REFERENCES [dbo].[ChiTietHSDT] ([MaCTHSDT])
GO
ALTER TABLE [dbo].[ThuocDaKe]  WITH CHECK ADD FOREIGN KEY([MaThuoc])
REFERENCES [dbo].[Thuoc] ([MaThuoc])
GO
ALTER TABLE [dbo].[VatTu]  WITH CHECK ADD FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[VatTuDaSuDung]  WITH CHECK ADD FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[VatTuDaSuDung]  WITH CHECK ADD FOREIGN KEY([MaVatTu])
REFERENCES [dbo].[VatTu] ([MaVT])
GO
USE [master]
GO
ALTER DATABASE [DentalCentreManagement] SET  READ_WRITE 
GO
