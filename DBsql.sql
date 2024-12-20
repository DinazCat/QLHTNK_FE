USE [master]
GO
/****** Object:  Database [DentalCentreManagement]    Script Date: 17/12/2024 1:21:02 CH ******/
CREATE DATABASE [DentalCentreManagement]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DentalCentreManagement', FILENAME = N'D:\App Setup\MSSQL15.SQLEXPRESS\MSSQL\DATA\DentalCentreManagement.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DentalCentreManagement_log', FILENAME = N'D:\App Setup\MSSQL15.SQLEXPRESS\MSSQL\DATA\DentalCentreManagement_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[AnhSauDieuTri]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[BenhNhan]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[ChamCong]    Script Date: 17/12/2024 1:21:02 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChamCong](
	[MaCC] [int] IDENTITY(1000,1) NOT NULL,
	[MaNV] [int] NOT NULL,
	[Ngay] [nvarchar](10) NULL,
	[SoGioLam] [decimal](5, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaCC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiNhanh]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[ChiTietHSDT]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[ChiTietThanhToan]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[DichVu]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[DichVuDaSuDung]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[GiamGia]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[HoaDon]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[LichHen]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[LichLamViec]    Script Date: 17/12/2024 1:21:02 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichLamViec](
	[MaLichLamViec] [int] IDENTITY(1000,1) NOT NULL,
	[MaNS] [int] NULL,
	[Ngay] [nvarchar](10) NULL,
	[GioBatDau] [nvarchar](5) NULL,
	[GioKetThuc] [nvarchar](5) NULL,
	[GhiChu] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLichLamViec] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LuongThuong]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[NhanVien]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[PhanHoi]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 17/12/2024 1:21:02 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[MaTK] [int] IDENTITY(1000,1) NOT NULL,
	[MaNguoiDung] [nvarchar](30) NULL,
	[Ten] [nvarchar](100) NULL,
	[SoDienThoai] [nvarchar](15) NULL,
	[Tuoi] [int] NULL,
	[Email] [nvarchar](100) NULL,
	[MatKhau] [nvarchar](255) NULL,
	[LoaiNguoiDung] [nvarchar](10) NULL,
	[XacNhan] [int] NULL,
	[Token] [nvarchar](max) NULL,
	[MaNV] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Thuoc]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[ThuocDaKe]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[VatTu]    Script Date: 17/12/2024 1:21:02 CH ******/
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
/****** Object:  Table [dbo].[VatTuDaSuDung]    Script Date: 17/12/2024 1:21:02 CH ******/
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
PRIMARY KEY CLUSTERED 
(
	[MaVTDSD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BenhNhan] ON 

INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1005, N'Nguyễn Văn An', N'0912345678', N'012345678901', N'123 Đường ABC, TP.HCM', N'Nam', N'1990-05-15', NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1006, N'Trần Thị Bích', N'0934567890', N'098765432109', N'456 Đường XYZ, TP.HCM', N'Nữ', N'1985-09-20', N'Huyết áp cao', CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1007, N'Lê Thị Cẩm', N'0987654321', N'123456789012', N'789 Đường DEF, TP.HCM', N'Nữ', N'1992-03-12', NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1008, N'Phạm Hữu Dũng', N'0911223344', N'345678901234', N'234 Đường MNO, TP.HCM', N'Nam', N'1988-07-09', NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1009, N'Võ Thị Hoa', N'0933556677', N'456789012345', N'567 Đường PQR, TP.HCM', N'Nữ', N'1995-11-05', N'Đau dạ dày', CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)))
INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1010, N'Văn Mai Tuyết', N'0437624735', N'067437846234', N'quận 7', N'Nam', N'2003-01-16', N'Không', NULL, NULL, NULL, NULL)
INSERT [dbo].[BenhNhan] ([MaBN], [TenBN], [SoDienThoai], [CCCD], [DiaChi], [GioiTinh], [NgaySinh], [TienSuBenhLy], [TongChi], [ChietKhau], [DaThanhToan], [CongNo]) VALUES (1011, N'Mai Hùng Vương', N'0543287549', N'067437845342', N'quận 9', N'Nam', N'1999-07-17', N'Tiểu đường, huyết áp cao', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[BenhNhan] OFF
GO
SET IDENTITY_INSERT [dbo].[ChamCong] ON 

INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1000, 1005, N'2024-12-14', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1001, 1006, N'2024-12-14', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1002, 1007, N'2024-12-14', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1003, 1005, N'2024-12-12', CAST(6.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1004, 1006, N'2024-12-12', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1005, 1007, N'2024-12-12', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1006, 1005, N'2024-12-13', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1007, 1006, N'2024-12-13', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1008, 1007, N'2024-12-13', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1009, 1005, N'2024-12-11', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1010, 1006, N'2024-12-11', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1011, 1007, N'2024-12-11', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1012, 1005, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1013, 1006, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1014, 1007, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1015, 1008, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1016, 1010, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1017, 1011, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1018, 1012, N'2024-12-15', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1019, 1005, N'2024-12-16', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1020, 1006, N'2024-12-16', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1021, 1007, N'2024-12-16', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1022, 1008, N'2024-12-16', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1023, 1010, N'2024-12-16', CAST(6.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1024, 1011, N'2024-12-16', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1025, 1012, N'2024-12-16', CAST(4.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1026, 1013, N'2024-12-16', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1027, 1005, N'2024-12-17', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1028, 1006, N'2024-12-17', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1029, 1007, N'2024-12-17', CAST(8.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1030, 1008, N'2024-12-17', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1031, 1010, N'2024-12-17', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1032, 1011, N'2024-12-17', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1033, 1012, N'2024-12-17', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[ChamCong] ([MaCC], [MaNV], [Ngay], [SoGioLam]) VALUES (1034, 1013, N'2024-12-17', CAST(0.00 AS Decimal(5, 2)))
SET IDENTITY_INSERT [dbo].[ChamCong] OFF
GO
SET IDENTITY_INSERT [dbo].[ChiNhanh] ON 

INSERT [dbo].[ChiNhanh] ([MaCN], [TenCN], [DiaChi], [MoTa], [An]) VALUES (1000, N'Chi nhánh Thủ Đức', N'123 Lê Văn Việt, Long Thạnh Mỹ, TP.Hồ Chí Minh', N'Chi nhánh Thủ Đức Hồ Chí Minh', 0)
INSERT [dbo].[ChiNhanh] ([MaCN], [TenCN], [DiaChi], [MoTa], [An]) VALUES (1001, N'Chi nhánh Quận 1', N'456 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh', N'Chi nhánh quận 1 TPHCM', 0)
INSERT [dbo].[ChiNhanh] ([MaCN], [TenCN], [DiaChi], [MoTa], [An]) VALUES (1002, N'Chi nhánh Hà Nội', N'123 Đường Láng, Đống Đa, Hà Nội', N'Chi nhánh chính tại Hà Nội', 0)
SET IDENTITY_INSERT [dbo].[ChiNhanh] OFF
GO
SET IDENTITY_INSERT [dbo].[ChiTietHSDT] ON 

INSERT [dbo].[ChiTietHSDT] ([MaCTHSDT], [MaBN], [LyDoKham], [ChanDoan], [NgayDieuTri], [MaNhaSi], [MaChiNhanh], [GhiChu]) VALUES (1001, 1005, N'Làm răng sứ', N'Hư răng 12', N'2024-12-14', 1005, 1000, N'')
INSERT [dbo].[ChiTietHSDT] ([MaCTHSDT], [MaBN], [LyDoKham], [ChanDoan], [NgayDieuTri], [MaNhaSi], [MaChiNhanh], [GhiChu]) VALUES (1002, 1005, N'Nhổ răng khôn', N'Răng khôn mọc lệch', N'2024-12-10', 1005, 1000, N'')
INSERT [dbo].[ChiTietHSDT] ([MaCTHSDT], [MaBN], [LyDoKham], [ChanDoan], [NgayDieuTri], [MaNhaSi], [MaChiNhanh], [GhiChu]) VALUES (1003, 1007, N'Muốn niềng răng', N'Răng không đều, hơi hô nhẹ', N'2024-12-15', 1006, 1000, N'')
INSERT [dbo].[ChiTietHSDT] ([MaCTHSDT], [MaBN], [LyDoKham], [ChanDoan], [NgayDieuTri], [MaNhaSi], [MaChiNhanh], [GhiChu]) VALUES (1005, 1009, N'Tẩy trắng răng', N'Răng ố vàng', N'2024-12-14', 1006, 1000, N'')
INSERT [dbo].[ChiTietHSDT] ([MaCTHSDT], [MaBN], [LyDoKham], [ChanDoan], [NgayDieuTri], [MaNhaSi], [MaChiNhanh], [GhiChu]) VALUES (1006, 1010, N'Đau răng khôn', N'Răng khôn mọc lệch', N'2024-12-16', 1006, 1000, N'')
INSERT [dbo].[ChiTietHSDT] ([MaCTHSDT], [MaBN], [LyDoKham], [ChanDoan], [NgayDieuTri], [MaNhaSi], [MaChiNhanh], [GhiChu]) VALUES (1007, 1011, N'Làm răng sứ', N'Răng không đều', N'2024-12-17', 1006, 1000, N'Bệnh nhân không cần quá đều')
SET IDENTITY_INSERT [dbo].[ChiTietHSDT] OFF
GO
SET IDENTITY_INSERT [dbo].[ChiTietThanhToan] ON 

INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1000, N'2024-12-14', CAST(40000000.00 AS Decimal(18, 2)), N'Chuyển khoản ACB', 1000)
INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1001, N'2024-12-10', CAST(6000000.00 AS Decimal(18, 2)), N'Chuyển khoản ACB', 1001)
INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1002, N'2024-12-15', CAST(15000000.00 AS Decimal(18, 2)), N'Chuyển khoản', 1002)
INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1002, N'2024-12-15', CAST(5000000.00 AS Decimal(18, 2)), N'Chuyển khoản', 1003)
INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1003, N'2024-12-14', CAST(2500000.00 AS Decimal(18, 2)), N'Tiền mặt', 1004)
INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1004, N'2024-12-16', CAST(4330000.00 AS Decimal(18, 2)), NULL, 1005)
INSERT [dbo].[ChiTietThanhToan] ([MaHD], [NgayThanhToan], [SoTienThanhToan], [HinhThucThanhToan], [MaCTTT]) VALUES (1000, N'2024-12-17', CAST(3000000.00 AS Decimal(18, 2)), NULL, 1006)
SET IDENTITY_INSERT [dbo].[ChiTietThanhToan] OFF
GO
SET IDENTITY_INSERT [dbo].[DichVu] ON 

INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1000, N'Khám tổng quát răng miệng', N'Khám bệnh', CAST(150000.00 AS Decimal(18, 2)), CAST(300000.00 AS Decimal(18, 2)), N'Khám tổng quát và tư vấn tình trạng răng miệng', N'Không bảo hành', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1001, N'Lấy cao răng', N'Vệ sinh răng miệng', CAST(200000.00 AS Decimal(18, 2)), CAST(400000.00 AS Decimal(18, 2)), N'Làm sạch mảng bám và cao răng', N'Không bảo hành', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1002, N'Chụp X-quang răng', N'Chẩn đoán hình ảnh', CAST(300000.00 AS Decimal(18, 2)), CAST(500000.00 AS Decimal(18, 2)), N'Chụp X-quang kiểm tra tình trạng răng', N'Không bảo hành', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1003, N'Tẩy trắng răng', N'Thẩm mỹ', CAST(1500000.00 AS Decimal(18, 2)), CAST(3000000.00 AS Decimal(18, 2)), N'Tẩy trắng răng bằng công nghệ laser', N'Bảo hành 3 tháng', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1004, N'Niềng răng sứ', N'Thẩm mỹ', CAST(30000000.00 AS Decimal(18, 2)), CAST(60000000.00 AS Decimal(18, 2)), N'Niềng răng sứ chỉnh nha toàn diện', N'Bảo hành 5 năm', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1005, N'Niềng răng kim loại', N'Thẩm mỹ', CAST(20000000.00 AS Decimal(18, 2)), CAST(40000000.00 AS Decimal(18, 2)), N'Niềng răng kim loại chỉnh nha toàn diện', N'Bảo hành 5 năm', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1006, N'Điều trị tủy răng', N'Điều trị', CAST(1000000.00 AS Decimal(18, 2)), CAST(3000000.00 AS Decimal(18, 2)), N'Dịch vụ điều trị tủy răng chuyên sâu.', N'Bảo hành 1 năm nếu tái phát.', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1007, N'Trám răng', N'Phục hồi', CAST(300000.00 AS Decimal(18, 2)), CAST(1000000.00 AS Decimal(18, 2)), N'Dịch vụ trám răng thẩm mỹ và bền chắc.', N'Bảo hành 6 tháng nếu răng bị bong tróc.', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1012, N'Tiểu phẫu răng khôn', N'Nhổ răng', CAST(1500000.00 AS Decimal(18, 2)), CAST(5000000.00 AS Decimal(18, 2)), N'Tiểu phẫu răng không mọc lệch gây đau khó chịu', N'Không bảo hành', 0)
INSERT [dbo].[DichVu] ([MaDV], [TenDV], [LoaiDV], [GiaThapNhat], [GiaCaoNhat], [MoTa], [ChinhSachBaoHanh], [An]) VALUES (1013, N'Răng toàn sứ Roland', N'Răng sứ', CAST(4000000.00 AS Decimal(18, 2)), CAST(5500000.00 AS Decimal(18, 2)), N'Răng sứ Roland bền đẹp', N'Bảo hành 2 năm', 0)
SET IDENTITY_INSERT [dbo].[DichVu] OFF
GO
SET IDENTITY_INSERT [dbo].[DichVuDaSuDung] ON 

INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1002, 1012, CAST(3000000.00 AS Decimal(18, 2)), 2, CAST(0.00 AS Decimal(18, 2)), N'', N'', 1001)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1003, 1005, CAST(30000000.00 AS Decimal(18, 2)), 1, CAST(0.00 AS Decimal(18, 2)), N'', N'', 1002)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1003, 1001, CAST(300000.00 AS Decimal(18, 2)), 1, CAST(0.00 AS Decimal(18, 2)), N'', N'', 1003)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1005, 1003, CAST(2500000.00 AS Decimal(18, 2)), 1, CAST(0.00 AS Decimal(18, 2)), N'', N'', 1004)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1006, 1012, CAST(4000000.00 AS Decimal(18, 2)), 1, CAST(0.00 AS Decimal(18, 2)), N'', NULL, 1007)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1006, 1002, CAST(300000.00 AS Decimal(18, 2)), 1, CAST(0.00 AS Decimal(18, 2)), N'', NULL, 1008)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1007, 1013, CAST(4000000.00 AS Decimal(18, 2)), 20, CAST(5.00 AS Decimal(18, 2)), N'', N'2025-01-07', 1009)
INSERT [dbo].[DichVuDaSuDung] ([MaCTHSDT], [MaDV], [GiaDichVu], [SoLuong], [ChietKhau], [GhiChu], [TaiKham], [MaDVSD]) VALUES (1001, 1004, CAST(60000000.00 AS Decimal(18, 2)), 1, CAST(10.00 AS Decimal(18, 2)), N'', NULL, 1011)
SET IDENTITY_INSERT [dbo].[DichVuDaSuDung] OFF
GO
SET IDENTITY_INSERT [dbo].[GiamGia] ON 

INSERT [dbo].[GiamGia] ([MaGiamGia], [TenGiamGia], [SoTienGiam], [PhanTramGiam], [DieuKienApDung], [NgayBatDau], [NgayKetThuc], [An]) VALUES (1000, N'Giảm giá mùa Noel', CAST(10000.00 AS Decimal(18, 2)), CAST(10.00 AS Decimal(5, 2)), N'Áp dụng cho đơn hàng.', N'2024-11-25', N'2024-12-30', 0)
INSERT [dbo].[GiamGia] ([MaGiamGia], [TenGiamGia], [SoTienGiam], [PhanTramGiam], [DieuKienApDung], [NgayBatDau], [NgayKetThuc], [An]) VALUES (1001, N'Tết Sale 2025', CAST(500000.00 AS Decimal(18, 2)), CAST(15.00 AS Decimal(5, 2)), N'Áp dụng cho tất cả các dịch vụ và đơn hàng trên 2,000,000 VNĐ.', N'2025-01-15', N'2025-02-15', 0)
INSERT [dbo].[GiamGia] ([MaGiamGia], [TenGiamGia], [SoTienGiam], [PhanTramGiam], [DieuKienApDung], [NgayBatDau], [NgayKetThuc], [An]) VALUES (1002, N'Sale 1/1', NULL, CAST(5.00 AS Decimal(5, 2)), N'Áp dụng mọi khách hàng', N'2024-12-16', N'2025-01-04', 0)
SET IDENTITY_INSERT [dbo].[GiamGia] OFF
GO
SET IDENTITY_INSERT [dbo].[HoaDon] ON 

INSERT [dbo].[HoaDon] ([MaHD], [MaBN], [MaNV], [MaCTHSDT], [MaGiamGia], [NgayLap], [SoTienGiam], [PhanTramGiam], [LyDoGiam], [SoTienDaThanhToan], [SoTienConNo], [TinhTrang]) VALUES (1000, 1005, 1010, 1001, NULL, N'2024-12-14', CAST(0.00 AS Decimal(18, 2)), NULL, NULL, CAST(43000000.00 AS Decimal(18, 2)), CAST(11000000.00 AS Decimal(18, 2)), N'Còn nợ')
INSERT [dbo].[HoaDon] ([MaHD], [MaBN], [MaNV], [MaCTHSDT], [MaGiamGia], [NgayLap], [SoTienGiam], [PhanTramGiam], [LyDoGiam], [SoTienDaThanhToan], [SoTienConNo], [TinhTrang]) VALUES (1001, 1005, NULL, 1002, NULL, N'2024-12-10', CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(5, 2)), NULL, CAST(6000000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), N'Ðã thanh toán')
INSERT [dbo].[HoaDon] ([MaHD], [MaBN], [MaNV], [MaCTHSDT], [MaGiamGia], [NgayLap], [SoTienGiam], [PhanTramGiam], [LyDoGiam], [SoTienDaThanhToan], [SoTienConNo], [TinhTrang]) VALUES (1002, 1006, NULL, 1003, NULL, N'2024-12-15', CAST(1000000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(5, 2)), N'Khách quen', CAST(20000000.00 AS Decimal(18, 2)), CAST(12000000.00 AS Decimal(18, 2)), N'Còn nợ')
INSERT [dbo].[HoaDon] ([MaHD], [MaBN], [MaNV], [MaCTHSDT], [MaGiamGia], [NgayLap], [SoTienGiam], [PhanTramGiam], [LyDoGiam], [SoTienDaThanhToan], [SoTienConNo], [TinhTrang]) VALUES (1003, 1009, NULL, 1005, NULL, N'2024-12-14', CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(5, 2)), N'', CAST(2500000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), N'Đã thanh toán')
INSERT [dbo].[HoaDon] ([MaHD], [MaBN], [MaNV], [MaCTHSDT], [MaGiamGia], [NgayLap], [SoTienGiam], [PhanTramGiam], [LyDoGiam], [SoTienDaThanhToan], [SoTienConNo], [TinhTrang]) VALUES (1004, 1010, 1007, 1006, NULL, N'2024-12-16', CAST(0.00 AS Decimal(18, 2)), NULL, NULL, CAST(4330000.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), N'Đã thanh toán')
INSERT [dbo].[HoaDon] ([MaHD], [MaBN], [MaNV], [MaCTHSDT], [MaGiamGia], [NgayLap], [SoTienGiam], [PhanTramGiam], [LyDoGiam], [SoTienDaThanhToan], [SoTienConNo], [TinhTrang]) VALUES (1005, 1011, NULL, 1007, NULL, N'2024-12-17', NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[HoaDon] OFF
GO
SET IDENTITY_INSERT [dbo].[LichHen] ON 

INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1006, 1000, NULL, NULL, N'Mai Anh', N'0123483943', N'', N'', N'2024-12-6', N'16:20', N'Đau răng', N'khách ko có nhu cầu nữa', N'WebBooking', N'Đã xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1007, 1000, NULL, NULL, N'Hoàng Mỹ Linh', N'0998394783', N'quận 9', N'mylinh99@gmail.com', N'2024-12-6', N'23:57', N'', N'đã đặt lịch', N'WebBooking', N'Đã xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1009, 1000, 1005, 1006, N'Nguyễn Văn An', N'0912345678', NULL, NULL, N'2024-12-13', N'17:33', N'Làm sứ', N'', N'Khám lần đầu', N'Đã xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1010, 1000, 1007, 1005, N'Lê Thị Cẩm', N'0987654321', NULL, NULL, N'2024-12-12', N'10:30', N'Đau răng', N'', N'Khám lần đầu', N'Đã ra về')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1011, 1000, 1006, 1006, N'Trần Thị Bích', N'0934567890', NULL, NULL, N'2024-12-13', N'09:00', N'Tư vấn invisilign', N'', N'Khám lần đầu', N'Đã đến')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1012, 1000, NULL, NULL, N'Hoàng Mỹ ', N'0998394783', N'quận 7', N'myhoang9@gmail.com', N'2024-12-13', N'17:10', N'Nhổ răng khôn', NULL, N'Khám lần đầu', N'Đã xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1013, 1000, NULL, NULL, N'Văn Hoàng', N'0128394783', N'quận 7', N'myhoang9@gmail.com', N'2024-12-14', N'18:15', N'Nhổ răng', NULL, N'WebBooking', N'Đã xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1014, 1000, NULL, NULL, N'Văn Hoàng', N'0128394783', N'quận 7', N'myhoang9@gmail.com', N'2024-12-14', N'18:30', N'Trám răng', NULL, N'WebBooking', N'Đã xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1015, 1000, NULL, NULL, N'Văn Hoàng', N'0128394783', NULL, NULL, N'2024-12-14', N'18:30', N'Trám răng', NULL, N'Khám lần đầu', N'Đã hủy')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1165, 1000, NULL, NULL, N'Cát Thanh', N'0998394324', N'Võ Văn Ngân', N'bab51035@kisoq.com', NULL, NULL, N'Tư vấn', NULL, N'WebBooking', N'Chưa xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1166, 1000, NULL, NULL, N'Trịnh Bảo Tuấn', N'0954895748', N'', N'', N'2024-12-31', N'05:00', N'', NULL, N'WebBooking', N'Đã xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1170, 1000, NULL, 1006, N'Thanh Thư', N'0905482245', NULL, NULL, N'2024-12-18', N'13:00', N'Tư vấn implant', NULL, N'Khám lần đầu', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1172, 1000, NULL, 1006, N'Trần Trịnh Phương Tuấn', N'0525542541', NULL, NULL, N'2024-12-17', N'13:00', N'Tẩy trắng răng', NULL, N'Khám lần đầu', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1173, 1000, NULL, 1006, N'Huyền Linh', N'0943589893', NULL, NULL, N'2024-12-17', N'15:30', N'Tư vấn invisilign', NULL, N'Khám lần đầu', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1174, 1000, 1009, 1005, N'Võ Thị Hoa', N'0933556677', NULL, NULL, N'2024-12-17', N'15:00', N'Trồng implant', N'', N'Tái khám', N'Đã xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1175, 1000, NULL, NULL, N'Trịnh Bảo Tuấn', N'0954895748', NULL, NULL, N'2024-12-31', N'05:00', N'Đau răng khôn', NULL, N'Khám lần đầu', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1176, 1000, 1008, 1013, N'Phạm Hữu Dũng', N'0911223344', NULL, NULL, N'2024-12-17', N'15:00', N'Nhổ răng', N'', N'Chữa bệnh', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1177, 1000, NULL, NULL, N'Trịnh Bảo Tuấn', N'0456685476', N'312 Nguyễn Văn Linh', N'qut34358@kisoq.com', N'2024-12-24', N'11:00', N'Viêm nướu', NULL, N'WebBooking', N'Đã xử lý')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1178, 1000, NULL, 1006, N'Vũ Thị Ngọc Linh', N'0549245789', NULL, NULL, N'2024-12-24', N'13:00', N'Trám răng', NULL, N'Khám lần đầu', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1179, 1000, NULL, NULL, N'Trịnh Bảo Tuấn', N'0456685476', NULL, NULL, N'2024-12-24', N'11:00', N'Viêm nướu', NULL, N'Khám lần đầu', N'Chờ xác nhận')
INSERT [dbo].[LichHen] ([MaLichHen], [MaChiNhanh], [MaBN], [MaNS], [HoTen], [SoDienThoai], [DiaChi], [Email], [Ngay], [Gio], [LyDoKham], [GhiChu], [LoaiLichHen], [TrangThai]) VALUES (1180, 1000, 1005, 1005, N'Nguyễn Văn An', N'0912345678', NULL, NULL, N'2024-12-20', N'15:00', N'Đau răng', N'', N'Khám lần đầu', N'Chờ xác nhận')
SET IDENTITY_INSERT [dbo].[LichHen] OFF
GO
SET IDENTITY_INSERT [dbo].[LichLamViec] ON 

INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1252, 1006, N'2024-12-03', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1253, 1006, N'2024-12-03', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1254, 1006, N'2024-12-03', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1255, 1006, N'2024-12-03', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1256, 1006, N'2024-12-03', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1257, 1006, N'2024-12-03', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1258, 1006, N'2024-12-03', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1259, 1006, N'2024-12-03', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1260, 1006, N'2024-12-03', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1261, 1006, N'2024-12-03', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1262, 1006, N'2024-12-03', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1263, 1006, N'2024-12-03', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1264, 1006, N'2024-12-03', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1265, 1006, N'2024-12-03', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1266, 1006, N'2024-12-04', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1267, 1006, N'2024-12-04', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1268, 1006, N'2024-12-04', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1269, 1006, N'2024-12-04', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1270, 1006, N'2024-12-04', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1271, 1006, N'2024-12-04', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1272, 1006, N'2024-12-04', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1273, 1006, N'2024-12-04', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1274, 1006, N'2024-12-04', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1275, 1006, N'2024-12-04', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1276, 1006, N'2024-12-04', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1277, 1006, N'2024-12-04', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1278, 1006, N'2024-12-04', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1279, 1006, N'2024-12-04', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1280, 1006, N'2024-12-10', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1281, 1006, N'2024-12-10', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1282, 1006, N'2024-12-10', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1283, 1006, N'2024-12-10', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1284, 1006, N'2024-12-10', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1285, 1006, N'2024-12-10', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1286, 1006, N'2024-12-10', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1287, 1006, N'2024-12-10', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1288, 1006, N'2024-12-10', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1289, 1006, N'2024-12-10', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1290, 1006, N'2024-12-10', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1291, 1006, N'2024-12-10', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1292, 1006, N'2024-12-10', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1293, 1006, N'2024-12-10', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1294, 1006, N'2024-12-11', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1295, 1006, N'2024-12-11', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1296, 1006, N'2024-12-11', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1297, 1006, N'2024-12-11', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1298, 1006, N'2024-12-11', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1299, 1006, N'2024-12-11', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1300, 1006, N'2024-12-11', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1301, 1006, N'2024-12-11', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1302, 1006, N'2024-12-11', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1303, 1006, N'2024-12-11', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1304, 1006, N'2024-12-11', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1305, 1006, N'2024-12-11', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1306, 1006, N'2024-12-11', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1307, 1006, N'2024-12-11', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1308, 1006, N'2024-12-17', N'13:00', NULL, N'1172')
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1309, 1006, N'2024-12-17', N'13:30', NULL, NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1310, 1006, N'2024-12-17', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1311, 1006, N'2024-12-17', N'14:30', NULL, NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1312, 1006, N'2024-12-17', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1313, 1006, N'2024-12-17', N'15:30', N'16:00', N'1173')
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1314, 1006, N'2024-12-17', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1315, 1006, N'2024-12-17', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1316, 1006, N'2024-12-17', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1317, 1006, N'2024-12-17', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1318, 1006, N'2024-12-17', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1319, 1006, N'2024-12-17', N'18:30', NULL, NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1320, 1006, N'2024-12-17', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1321, 1006, N'2024-12-17', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1322, 1006, N'2024-12-18', N'13:00', N'13:30', N'1170')
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1323, 1006, N'2024-12-18', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1324, 1006, N'2024-12-18', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1325, 1006, N'2024-12-18', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1326, 1006, N'2024-12-18', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1327, 1006, N'2024-12-18', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1328, 1006, N'2024-12-18', N'16:00', NULL, NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1329, 1006, N'2024-12-18', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1330, 1006, N'2024-12-18', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1331, 1006, N'2024-12-18', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1332, 1006, N'2024-12-18', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1333, 1006, N'2024-12-18', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1334, 1006, N'2024-12-18', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1335, 1006, N'2024-12-18', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1336, 1006, N'2024-12-24', N'13:00', N'13:30', N'1178')
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1337, 1006, N'2024-12-24', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1338, 1006, N'2024-12-24', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1339, 1006, N'2024-12-24', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1340, 1006, N'2024-12-24', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1341, 1006, N'2024-12-24', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1342, 1006, N'2024-12-24', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1343, 1006, N'2024-12-24', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1344, 1006, N'2024-12-24', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1345, 1006, N'2024-12-24', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1346, 1006, N'2024-12-24', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1347, 1006, N'2024-12-24', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1348, 1006, N'2024-12-24', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1349, 1006, N'2024-12-24', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1350, 1006, N'2024-12-25', N'13:00', N'13:30', NULL)
GO
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1351, 1006, N'2024-12-25', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1352, 1006, N'2024-12-25', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1353, 1006, N'2024-12-25', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1354, 1006, N'2024-12-25', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1355, 1006, N'2024-12-25', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1356, 1006, N'2024-12-25', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1357, 1006, N'2024-12-25', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1358, 1006, N'2024-12-25', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1359, 1006, N'2024-12-25', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1360, 1006, N'2024-12-25', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1361, 1006, N'2024-12-25', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1362, 1006, N'2024-12-25', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1363, 1006, N'2024-12-25', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1364, 1006, N'2024-12-31', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1365, 1006, N'2024-12-31', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1366, 1006, N'2024-12-31', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1367, 1006, N'2024-12-31', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1368, 1006, N'2024-12-31', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1369, 1006, N'2024-12-31', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1370, 1006, N'2024-12-31', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1371, 1006, N'2024-12-31', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1372, 1006, N'2024-12-31', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1373, 1006, N'2024-12-31', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1374, 1006, N'2024-12-31', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1375, 1006, N'2024-12-31', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1376, 1006, N'2024-12-31', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1377, 1006, N'2024-12-31', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1378, 1006, N'2025-01-01', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1379, 1006, N'2025-01-01', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1380, 1006, N'2025-01-01', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1381, 1006, N'2025-01-01', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1382, 1006, N'2025-01-01', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1383, 1006, N'2025-01-01', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1384, 1006, N'2025-01-01', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1385, 1006, N'2025-01-01', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1386, 1006, N'2025-01-01', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1387, 1006, N'2025-01-01', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1388, 1006, N'2025-01-01', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1389, 1006, N'2025-01-01', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1390, 1006, N'2025-01-01', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1391, 1006, N'2025-01-01', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1392, 1006, N'2025-01-07', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1393, 1006, N'2025-01-07', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1394, 1006, N'2025-01-07', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1395, 1006, N'2025-01-07', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1396, 1006, N'2025-01-07', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1397, 1006, N'2025-01-07', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1398, 1006, N'2025-01-07', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1399, 1006, N'2025-01-07', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1400, 1006, N'2025-01-07', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1401, 1006, N'2025-01-07', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1402, 1006, N'2025-01-07', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1403, 1006, N'2025-01-07', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1404, 1006, N'2025-01-07', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1405, 1006, N'2025-01-07', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1406, 1006, N'2025-01-08', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1407, 1006, N'2025-01-08', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1408, 1006, N'2025-01-08', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1409, 1006, N'2025-01-08', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1410, 1006, N'2025-01-08', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1411, 1006, N'2025-01-08', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1412, 1006, N'2025-01-08', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1413, 1006, N'2025-01-08', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1414, 1006, N'2025-01-08', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1415, 1006, N'2025-01-08', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1416, 1006, N'2025-01-08', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1417, 1006, N'2025-01-08', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1418, 1006, N'2025-01-08', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1419, 1006, N'2025-01-08', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1420, 1006, N'2025-01-14', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1421, 1006, N'2025-01-14', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1422, 1006, N'2025-01-14', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1423, 1006, N'2025-01-14', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1424, 1006, N'2025-01-14', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1425, 1006, N'2025-01-14', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1426, 1006, N'2025-01-14', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1427, 1006, N'2025-01-14', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1428, 1006, N'2025-01-14', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1429, 1006, N'2025-01-14', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1430, 1006, N'2025-01-14', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1431, 1006, N'2025-01-14', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1432, 1006, N'2025-01-14', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1433, 1006, N'2025-01-14', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1434, 1006, N'2025-01-15', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1435, 1006, N'2025-01-15', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1436, 1006, N'2025-01-15', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1437, 1006, N'2025-01-15', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1438, 1006, N'2025-01-15', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1439, 1006, N'2025-01-15', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1440, 1006, N'2025-01-15', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1441, 1006, N'2025-01-15', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1442, 1006, N'2025-01-15', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1443, 1006, N'2025-01-15', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1444, 1006, N'2025-01-15', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1445, 1006, N'2025-01-15', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1446, 1006, N'2025-01-15', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1447, 1006, N'2025-01-15', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1448, 1006, N'2025-01-21', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1449, 1006, N'2025-01-21', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1450, 1006, N'2025-01-21', N'14:00', N'14:30', NULL)
GO
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1451, 1006, N'2025-01-21', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1452, 1006, N'2025-01-21', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1453, 1006, N'2025-01-21', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1454, 1006, N'2025-01-21', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1455, 1006, N'2025-01-21', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1456, 1006, N'2025-01-21', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1457, 1006, N'2025-01-21', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1458, 1006, N'2025-01-21', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1459, 1006, N'2025-01-21', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1460, 1006, N'2025-01-21', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1461, 1006, N'2025-01-21', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1462, 1006, N'2025-01-22', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1463, 1006, N'2025-01-22', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1464, 1006, N'2025-01-22', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1465, 1006, N'2025-01-22', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1466, 1006, N'2025-01-22', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1467, 1006, N'2025-01-22', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1468, 1006, N'2025-01-22', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1469, 1006, N'2025-01-22', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1470, 1006, N'2025-01-22', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1471, 1006, N'2025-01-22', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1472, 1006, N'2025-01-22', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1473, 1006, N'2025-01-22', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1474, 1006, N'2025-01-22', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1475, 1006, N'2025-01-22', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1476, 1006, N'2025-01-28', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1477, 1006, N'2025-01-28', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1478, 1006, N'2025-01-28', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1479, 1006, N'2025-01-28', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1480, 1006, N'2025-01-28', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1481, 1006, N'2025-01-28', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1482, 1006, N'2025-01-28', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1483, 1006, N'2025-01-28', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1484, 1006, N'2025-01-28', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1485, 1006, N'2025-01-28', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1486, 1006, N'2025-01-28', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1487, 1006, N'2025-01-28', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1488, 1006, N'2025-01-28', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1489, 1006, N'2025-01-28', N'19:30', N'20:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1490, 1006, N'2025-01-29', N'13:00', N'13:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1491, 1006, N'2025-01-29', N'13:30', N'14:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1492, 1006, N'2025-01-29', N'14:00', N'14:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1493, 1006, N'2025-01-29', N'14:30', N'15:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1494, 1006, N'2025-01-29', N'15:00', N'15:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1495, 1006, N'2025-01-29', N'15:30', N'16:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1496, 1006, N'2025-01-29', N'16:00', N'16:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1497, 1006, N'2025-01-29', N'16:30', N'17:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1498, 1006, N'2025-01-29', N'17:00', N'17:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1499, 1006, N'2025-01-29', N'17:30', N'18:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1500, 1006, N'2025-01-29', N'18:00', N'18:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1501, 1006, N'2025-01-29', N'18:30', N'19:00', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1502, 1006, N'2025-01-29', N'19:00', N'19:30', NULL)
INSERT [dbo].[LichLamViec] ([MaLichLamViec], [MaNS], [Ngay], [GioBatDau], [GioKetThuc], [GhiChu]) VALUES (1503, 1006, N'2025-01-29', N'19:30', N'20:00', NULL)
SET IDENTITY_INSERT [dbo].[LichLamViec] OFF
GO
SET IDENTITY_INSERT [dbo].[LuongThuong] ON 

INSERT [dbo].[LuongThuong] ([MaLT], [LoaiLT], [LoaiNV], [MaNV], [Nam], [Thang], [Tien], [MaCN], [GhiChu], [An]) VALUES (1003, N'Thưởng kpi', N'Nha sĩ', NULL, 2024, 12, CAST(100000.00 AS Decimal(18, 2)), NULL, N'', NULL)
INSERT [dbo].[LuongThuong] ([MaLT], [LoaiLT], [LoaiNV], [MaNV], [Nam], [Thang], [Tien], [MaCN], [GhiChu], [An]) VALUES (1004, N'Thưởng tất cả nhân viên tháng 12', N'Tất cả', NULL, 2024, 12, CAST(50000.00 AS Decimal(18, 2)), NULL, N'', NULL)
INSERT [dbo].[LuongThuong] ([MaLT], [LoaiLT], [LoaiNV], [MaNV], [Nam], [Thang], [Tien], [MaCN], [GhiChu], [An]) VALUES (1005, N'Thưởng nhân viên vượt KPI', N'Cá nhân', 1008, 2024, 12, CAST(200000.00 AS Decimal(18, 2)), NULL, N'', NULL)
SET IDENTITY_INSERT [dbo].[LuongThuong] OFF
GO
SET IDENTITY_INSERT [dbo].[NhanVien] ON 

INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1005, N'Nguyễn Thanh Tùng', N'0901234567', N'tung.nguyen@example.com', N'112233445566', N'Nam', N'1980-02-25', N'Nha sĩ', N'Bác sĩ nha khoa', 10, CAST(20000000.00 AS Decimal(18, 2)), 1000, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1006, N'Lê Minh Phương', N'0922345678', N'phuong.le@example.com', N'223344556677', N'Nữ', N'1987-08-15', N'Nha sĩ', N'BSCKI', 5, CAST(35000000.00 AS Decimal(18, 2)), 1000, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1007, N'Trần Quốc Hùng', N'0933456789', N'hung.tran@example.com', N'334455667788', N'Nam', N'1975-03-10', N'Quản lý', N'Cử nhân Quản trị', 15, CAST(45000000.00 AS Decimal(18, 2)), 1000, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1008, N'Nguyễn Thị Tiên', N'0786754563', N'phuta@gmail.com', N'037354738283', N'Nữ', N'1991-03-01', N'Phụ tá', N'Cử nhân', 2, CAST(15000000.00 AS Decimal(18, 2)), 1000, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1010, N'Nguyễn Minh Tuân', N'0786754560', N'tieptan@gmail.com', N'037354738288', N'Nam', N'1998-02-07', N'Tiếp tân', N'Cử nhân', 1, CAST(13000000.00 AS Decimal(18, 2)), 1000, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1011, N'Trần Hữu Khang', N'0786754509', N'quanly@gmail.com', N'037354738239', N'Nam', N'1985-07-19', N'Quản lý', N'Thạc sĩ răng hàm mặt', 8, CAST(40000000.00 AS Decimal(18, 2)), 1001, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1012, N'Trần Thanh Minh', N'0786547653', N'phuta2@gmail.com', N'037354738285', N'Nam', N'1993-08-23', N'Phụ tá', N'Cử nhân', 1, CAST(15000000.00 AS Decimal(18, 2)), 1001, 0)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1013, N'Phan Thị Thanh Trâm', N'0438931474', N'bab51035@kisoq.com', N'067437846234', N'Nữ', N'1996-01-08', N'Nha sĩ', N'Thạc sĩ Răng-Hàm-Mặt', 4, CAST(30000000.00 AS Decimal(18, 2)), 1000, 0)
SET IDENTITY_INSERT [dbo].[NhanVien] OFF
GO
SET IDENTITY_INSERT [dbo].[PhanHoi] ON 

INSERT [dbo].[PhanHoi] ([MaPH], [MaChiNhanh], [Ngay], [Gio], [NoiDung], [MaBN]) VALUES (1000, NULL, N'2024-12-13', N'9:44', N'Bác sĩ Mai làm rất có tâm, nói chuyện nhẹ nhàng dễ thương', NULL)
INSERT [dbo].[PhanHoi] ([MaPH], [MaChiNhanh], [Ngay], [Gio], [NoiDung], [MaBN]) VALUES (1001, NULL, N'2024-12-13', N'9:46', N'Nha khoa uy tín, đội ngũ chuyên nghiệp, phòng khám cơ sở vật chất hiện đại', NULL)
INSERT [dbo].[PhanHoi] ([MaPH], [MaChiNhanh], [Ngay], [Gio], [NoiDung], [MaBN]) VALUES (1002, NULL, N'2024-12-13', N'9:47', N'Bạn Mai Phượng thái độ ko tôn trọng khách', NULL)
INSERT [dbo].[PhanHoi] ([MaPH], [MaChiNhanh], [Ngay], [Gio], [NoiDung], [MaBN]) VALUES (1003, NULL, N'2024-12-17', N'10:24', N'Nha khoa rất tốt, không cần chờ đợi lâu', NULL)
SET IDENTITY_INSERT [dbo].[PhanHoi] OFF
GO
SET IDENTITY_INSERT [dbo].[TaiKhoan] ON 

INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1001, N'112233445566', N'Nguyễn Thanh Tùng', N'0901234567', 44, N'tung.nguyen@example.com', N'123456', N'Nha sĩ', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZsNXBXVGVKdWFxWDFkWk50L1JueWVMb2RScGhnNTlXMTJ0QXpZMVNxRkhKdWhyRExMMFZid1VkK3BqOXM1RFBMQkl3V0VOVTBtNmU2RVZGQkhadHljSmt0bnV3ZTAwb1hOR282aElrbUNpcm9TNlJUdldvMUlOVENLVWtKZWFWL0hjVm9mVXdmU204ZVhoQTZRU0ZoemtTenNvb1pwZE9PMS9qUTlkU1VNUTNteHdiUDhDcmFaU0RPeDljalZQazRYeFkzZzRnUVFxd3BEY0dvV2crTWNPTjVnUXJLWWVIbUVoWDNoeFhDQzhDZz09', 1005)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1002, N'223344556677', N'Lê Minh Phương', N'0922345678', 37, N'phuong.le@example.com', N'123456', N'Nha sĩ', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZreEJFK2RpTFFoMVRQcGdBVWN4T25pUHRBa2NrczJRVDlFT0tHa3o5U015SlI4bGcxM0JxaElJSDlaOXdOZmIxY2d5UXpJYTlnOHR2WnFwR0h4MmticnYvT25adXg2OFNNSU9xajczaWRHbGhGR1ErbDE2RDBIV2RzZmMrOG40SDdvREovNFFsREtTTWtuRXVVdnB6bEVwUnNMTmo3YUQ0UXdoWjlQVHJKWFZUaVl0UXlNNEZOakhxN3dYcGZyYkhzYmNyZmMyb0MxaVo4QXU5OHJEeWsxbU1jWWNWZnZPZy95T2NQNG9RSldTZz09', 1006)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1003, N'334455667788', N'Trần Quốc Hùng', N'0933456789', 49, N'hung.tran@example.com', N'123456', N'Quản lý', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZtVXFzV0x2eFNUcys3aTREdmJKT3ljbkF6V1dWOFpJQ3ZxRmFWajUrYXA1YjFZTVJNSHhNQ0RoTnJkMU9Ybk1aaXlXWWVJZjFXTXBUR000dVBjQlA2VmtsbzZjL2J5VGNkQThLamNvV3JBb2FJSkg3aXlUUTAya2pLT0FQcVNKbUZkUUFuZlA0ZDhrTFppTUJldjdZc3FiZ0liajN2VnN2WHV0aFgreHZEWEkwZkF0QkxzRHgzbUJMYkRCQ0d3OXphTGRJUStLaVJ5OEJHZDVLSG1hNnNzVmw5ZmNFcm5HREo0dGtTTG1UMzlnZz09', 1007)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1004, N'012376856438', N'Admin', N'0879675463', 49, N'admin@example.com', N'123456', N'ChuHeThong', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZtVDRpT3oyZ3RsYVN5N25qakdtbEUycitpdndNaFZEeUIzeFo1aU42VWl0Y2I1Sk9vWnBqQjFFUDVDK3ZwUjBYWmhhaWMvV3RxYkJpdTN6M1VOM2lXckdtRXFwV3k3NVB5N0RsYW5UMVB2R2JNUXhlYzdnZCs4ZmU0R0tEbWk4Mi9xRlJNRUdTSWltOGUwckkveWNxcmJPZEVDaVBPcVkvdDRiNjdrRTU3anZmNlBqcGh0dkx2TVlsNi9RdC80bU0rMXUxWUpnYkhTR1k4ZkFrZGU0WEhYUW84bnZTRk55d290aWRIVlV5ZXZKUT09', NULL)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1006, N'037354738283', N'Nguyễn Thị Tiên', N'0786754563', 33, N'phuta@gmail.com', N'123456', N'Phụ tá', 1, NULL, 1008)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1009, N'037354738288', N'Nguyễn Minh Tuân', N'0786754560', 26, N'tieptan@gmail.com', N'123456', N'Tiếp tân', 1, NULL, 1010)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1011, N'037354738239', N'Trần Hữu Khang', N'0786754509', 39, N'quanly@gmail.com', N'123456', N'Quản lý', 1, NULL, 1011)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1013, N'037354738285', N'Trần Thanh Minh', N'0786547653', 31, N'phuta2@gmail.com', N'123456', N'Phụ tá', 1, NULL, 1012)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1015, N'067437846234', N'Phan Thị Thanh Trâm', N'0438931474', 28, N'bab51035@kisoq.com', N'123456', N'Nha sĩ', 1, NULL, 1013)
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1016, N'012345678901', N'Nguyễn Văn An', N'0912345678', 34, N'abj95597@kisoq.com', N'123456', N'Customer', 1, N'Q2ZESjhQbE1tdTJQVnlWSXBobVFkZXUyZ2VkNS9Td1IreFJ5VXBmTlFIb1daUUdxZUs5eDFQS2lMdXYra2NzcGdsNG1wSFNTUFpFbjlodDV5ZUZ0ZlJ0MmFUOUJmZUF5c1JJdXhTOW5KMUtiR2hkR1p3eHgzYnlRNEdGb2FIRG52T1lFWEFSZVowdTJxRUpmenlrVmYyOGp4OUEyRHZXTSt6b0dTL1J3eDNNcXhsMS9PUDJrWEJiR05SNmg1UWsrcFRjd2pxTzk1dlRPcmsyYjlIYVFTSW9la2l6OGc1UWs1VWdNT2NjcXlIdUYxSVc2Mk9KUXNaK3NlMGt2MzdsbkprYWZEZz09', NULL)
SET IDENTITY_INSERT [dbo].[TaiKhoan] OFF
GO
SET IDENTITY_INSERT [dbo].[Thuoc] ON 

INSERT [dbo].[Thuoc] ([MaThuoc], [TenThuoc], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [DonGiaBan], [HanSuDung], [An]) VALUES (1001, N'Thuốc giảm đau', 1000, N'2024-11-01', 100, 77, CAST(5000.00 AS Decimal(18, 2)), CAST(10000.00 AS Decimal(18, 2)), N'2025-11-01', 0)
INSERT [dbo].[Thuoc] ([MaThuoc], [TenThuoc], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [DonGiaBan], [HanSuDung], [An]) VALUES (1002, N'Thuốc kháng sinh', 1001, N'2024-10-20', 200, 150, CAST(20000.00 AS Decimal(18, 2)), CAST(40000.00 AS Decimal(18, 2)), N'2025-10-20', 0)
INSERT [dbo].[Thuoc] ([MaThuoc], [TenThuoc], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [DonGiaBan], [HanSuDung], [An]) VALUES (1003, N'Thuốc sát khuẩn', 1002, N'2024-11-15', 50, 40, CAST(30000.00 AS Decimal(18, 2)), CAST(50000.00 AS Decimal(18, 2)), N'2025-11-15', 0)
INSERT [dbo].[Thuoc] ([MaThuoc], [TenThuoc], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [DonGiaBan], [HanSuDung], [An]) VALUES (1004, N'Thuốc chống viêm', 1000, N'2024-10-10', 80, 67, CAST(15000.00 AS Decimal(18, 2)), CAST(25000.00 AS Decimal(18, 2)), N'2025-10-10', 0)
INSERT [dbo].[Thuoc] ([MaThuoc], [TenThuoc], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [DonGiaBan], [HanSuDung], [An]) VALUES (1011, N'Thuốc diệt khuẩn', NULL, N'2024-12-01', 1000, 1000, CAST(3000.00 AS Decimal(18, 2)), CAST(3500.00 AS Decimal(18, 2)), N'2025-01-01', 0)
INSERT [dbo].[Thuoc] ([MaThuoc], [TenThuoc], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [DonGiaBan], [HanSuDung], [An]) VALUES (1012, N'Thuốc bôi tê', NULL, N'2024-12-17', 200, 200, CAST(2500.00 AS Decimal(18, 2)), CAST(3000.00 AS Decimal(18, 2)), N'2026-11-27', 0)
SET IDENTITY_INSERT [dbo].[Thuoc] OFF
GO
SET IDENTITY_INSERT [dbo].[ThuocDaKe] ON 

INSERT [dbo].[ThuocDaKe] ([MaCTHSDT], [MaThuoc], [SoLuong], [Gia], [GhiChu], [MaTDK]) VALUES (1006, 1001, 3, CAST(10000.00 AS Decimal(18, 2)), N'', 1000)
INSERT [dbo].[ThuocDaKe] ([MaCTHSDT], [MaThuoc], [SoLuong], [Gia], [GhiChu], [MaTDK]) VALUES (1007, 1004, 3, CAST(25000.00 AS Decimal(18, 2)), N'', 1001)
SET IDENTITY_INSERT [dbo].[ThuocDaKe] OFF
GO
SET IDENTITY_INSERT [dbo].[VatTu] ON 

INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1001, N'Găng tay y tế', 1000, N'2024-11-10', 300, 247, CAST(2000.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1002, N'Khẩu trang y tế', 1001, N'2024-10-25', 500, 400, CAST(1000.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1003, N'Kim tiêm nha khoa', 1002, N'2024-11-15', 100, 90, CAST(5000.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1004, N'Bông gạc', 1000, N'2024-11-01', 200, 172, CAST(1500.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1005, N'Dụng cụ mài răng', 1001, N'2024-11-12', 50, 45, CAST(100000.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1013, N'Composite', NULL, N'2024-12-09', 100, 100, CAST(20000.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1014, N'Tay khoan', NULL, N'2024-12-08', 10, 10, CAST(1000000.00 AS Decimal(18, 2)), 0)
INSERT [dbo].[VatTu] ([MaVT], [TenVT], [MaChiNhanh], [NgayNhap], [SoLuongNhap], [SoLuongTonKho], [DonGiaNhap], [An]) VALUES (1015, N'Kiềm y tế', NULL, N'2024-12-17', 20, 20, CAST(500000.00 AS Decimal(18, 2)), 0)
SET IDENTITY_INSERT [dbo].[VatTu] OFF
GO
SET IDENTITY_INSERT [dbo].[VatTuDaSuDung] ON 

INSERT [dbo].[VatTuDaSuDung] ([MaVatTu], [MaChiNhanh], [NgaySuDung], [SoLuong], [An], [MaVTDSD]) VALUES (1001, 1000, N'2024-12-16', 3, 0, 1000)
INSERT [dbo].[VatTuDaSuDung] ([MaVatTu], [MaChiNhanh], [NgaySuDung], [SoLuong], [An], [MaVTDSD]) VALUES (1004, 1000, N'2024-12-16', 3, 0, 1001)
INSERT [dbo].[VatTuDaSuDung] ([MaVatTu], [MaChiNhanh], [NgaySuDung], [SoLuong], [An], [MaVTDSD]) VALUES (1004, 1000, N'2024-12-17', 5, 0, 1002)
SET IDENTITY_INSERT [dbo].[VatTuDaSuDung] OFF
GO
ALTER TABLE [dbo].[ChiNhanh] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[DichVu] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[GiamGia] ADD  DEFAULT ((0)) FOR [An]
GO
ALTER TABLE [dbo].[NhanVien] ADD  DEFAULT ((0)) FOR [An]
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
ALTER TABLE [dbo].[ChamCong]  WITH CHECK ADD FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
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
ALTER TABLE [dbo].[LichHen]  WITH CHECK ADD  CONSTRAINT [FK__LichHen__MaChiNhanh__40196DG2] FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[LichHen] CHECK CONSTRAINT [FK__LichHen__MaChiNhanh__40196DG2]
GO
ALTER TABLE [dbo].[LichHen]  WITH CHECK ADD FOREIGN KEY([MaNS])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[LichLamViec]  WITH CHECK ADD FOREIGN KEY([MaNS])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[PhanHoi]  WITH CHECK ADD FOREIGN KEY([MaBN])
REFERENCES [dbo].[BenhNhan] ([MaBN])
GO
ALTER TABLE [dbo].[PhanHoi]  WITH CHECK ADD  CONSTRAINT [FK__PhanHoi__MaChiNhanh__4F6I8D72] FOREIGN KEY([MaChiNhanh])
REFERENCES [dbo].[ChiNhanh] ([MaCN])
GO
ALTER TABLE [dbo].[PhanHoi] CHECK CONSTRAINT [FK__PhanHoi__MaChiNhanh__4F6I8D72]
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
