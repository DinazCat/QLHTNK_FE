USE [DentalCentreManagement]
GO
SET IDENTITY_INSERT [dbo].[NhanVien] ON 
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1005, N'Nguyễn Thanh Tùng', N'0901234567', N'tung.nguyen@example.com', N'112233445566', N'Nam', N'1980-02-25', N'Nha sĩ', N'Bác sĩ nha khoa', 10, CAST(20000000.00 AS Decimal(18, 2)), 1000, 0)
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1006, N'Lê Minh Phương', N'0922345678', N'phuong.le@example.com', N'223344556677', N'Nữ', N'1987-08-15', N'Nha sĩ', N'BSCKI', 5, CAST(35000000.00 AS Decimal(18, 2)), 1000, 0)
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1007, N'Trần Quốc Hùng', N'0933456789', N'hung.tran@example.com', N'334455667788', N'Nam', N'1975-03-10', N'Quản lý', N'Cử nhân Quản trị', 15, CAST(45000000.00 AS Decimal(18, 2)), 1000, 0)
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1008, N'Nguyễn Thị Tiên', N'0786754563', N'phuta@gmail.com', N'037354738283', N'Nữ', N'1991-03-01', N'Phụ tá', N'Cử nhân', 2, CAST(15000000.00 AS Decimal(18, 2)), 1000, 0)
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1010, N'Nguyễn Minh Tuân', N'0786754560', N'tieptan@gmail.com', N'037354738288', N'Nam', N'1998-02-07', N'Tiếp tân', N'Cử nhân', 1, CAST(13000000.00 AS Decimal(18, 2)), 1000, 0)
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1011, N'Trần Hữu Khang', N'0786754509', N'quanly@gmail.com', N'037354738239', N'Nam', N'1985-07-19', N'Quản lý', N'Thạc sĩ răng hàm mặt', 8, CAST(40000000.00 AS Decimal(18, 2)), 1001, 0)
GO
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [SoDienThoai], [Email], [CCCD], [GioiTinh], [NgaySinh], [ChucVu], [BangCap], [KinhNghiem], [LuongCoBan], [MaChiNhanh], [An]) VALUES (1012, N'Trần Thanh Minh', N'0786547653', N'phuta2@gmail.com', N'037354738285', N'Nam', N'1993-08-23', N'Phụ tá', N'Cử nhân', 1, CAST(15000000.00 AS Decimal(18, 2)), 1001, 0)
GO
SET IDENTITY_INSERT [dbo].[NhanVien] OFF
GO
SET IDENTITY_INSERT [dbo].[TaiKhoan] ON 
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1001, N'112233445566', N'Nguyễn Thanh Tùng', N'0901234567', 44, N'tung.nguyen@example.com', N'123456', N'Nha sĩ', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZsNXBXVGVKdWFxWDFkWk50L1JueWVMb2RScGhnNTlXMTJ0QXpZMVNxRkhKdWhyRExMMFZid1VkK3BqOXM1RFBMQkl3V0VOVTBtNmU2RVZGQkhadHljSmt0bnV3ZTAwb1hOR282aElrbUNpcm9TNlJUdldvMUlOVENLVWtKZWFWL0hjVm9mVXdmU204ZVhoQTZRU0ZoemtTenNvb1pwZE9PMS9qUTlkU1VNUTNteHdiUDhDcmFaU0RPeDljalZQazRYeFkzZzRnUVFxd3BEY0dvV2crTWNPTjVnUXJLWWVIbUVoWDNoeFhDQzhDZz09', 1005)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1002, N'223344556677', N'Lê Minh Phương', N'0922345678', 37, N'phuong.le@example.com', N'123456', N'Nha sĩ', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZreEJFK2RpTFFoMVRQcGdBVWN4T25pUHRBa2NrczJRVDlFT0tHa3o5U015SlI4bGcxM0JxaElJSDlaOXdOZmIxY2d5UXpJYTlnOHR2WnFwR0h4MmticnYvT25adXg2OFNNSU9xajczaWRHbGhGR1ErbDE2RDBIV2RzZmMrOG40SDdvREovNFFsREtTTWtuRXVVdnB6bEVwUnNMTmo3YUQ0UXdoWjlQVHJKWFZUaVl0UXlNNEZOakhxN3dYcGZyYkhzYmNyZmMyb0MxaVo4QXU5OHJEeWsxbU1jWWNWZnZPZy95T2NQNG9RSldTZz09', 1006)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1003, N'334455667788', N'Trần Quốc Hùng', N'0933456789', 49, N'hung.tran@example.com', N'123456', N'Quản lý', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZtVXFzV0x2eFNUcys3aTREdmJKT3ljbkF6V1dWOFpJQ3ZxRmFWajUrYXA1YjFZTVJNSHhNQ0RoTnJkMU9Ybk1aaXlXWWVJZjFXTXBUR000dVBjQlA2VmtsbzZjL2J5VGNkQThLamNvV3JBb2FJSkg3aXlUUTAya2pLT0FQcVNKbUZkUUFuZlA0ZDhrTFppTUJldjdZc3FiZ0liajN2VnN2WHV0aFgreHZEWEkwZkF0QkxzRHgzbUJMYkRCQ0d3OXphTGRJUStLaVJ5OEJHZDVLSG1hNnNzVmw5ZmNFcm5HREo0dGtTTG1UMzlnZz09', 1007)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1004, N'012376856438', N'Admin', N'0879675463', 49, N'admin@example.com', N'123456', N'ChuHeThong', 1, N'Q2ZESjhNNDlTUVFOVWpST25jSFVsYlNZc0ZtVDRpT3oyZ3RsYVN5N25qakdtbEUycitpdndNaFZEeUIzeFo1aU42VWl0Y2I1Sk9vWnBqQjFFUDVDK3ZwUjBYWmhhaWMvV3RxYkJpdTN6M1VOM2lXckdtRXFwV3k3NVB5N0RsYW5UMVB2R2JNUXhlYzdnZCs4ZmU0R0tEbWk4Mi9xRlJNRUdTSWltOGUwckkveWNxcmJPZEVDaVBPcVkvdDRiNjdrRTU3anZmNlBqcGh0dkx2TVlsNi9RdC80bU0rMXUxWUpnYkhTR1k4ZkFrZGU0WEhYUW84bnZTRk55d290aWRIVlV5ZXZKUT09', NULL)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1006, N'037354738283', N'Nguyễn Thị Tiên', N'0786754563', 33, N'phuta@gmail.com', N'123456', N'Phụ tá', 1, NULL, 1008)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1009, N'037354738288', N'Nguyễn Minh Tuân', N'0786754560', 26, N'tieptan@gmail.com', N'123456', N'Tiếp tân', 1, NULL, 1010)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1011, N'037354738239', N'Trần Hữu Khang', N'0786754509', 39, N'quanly@gmail.com', N'123456', N'Quản lý', 1, NULL, 1011)
GO
INSERT [dbo].[TaiKhoan] ([MaTK], [MaNguoiDung], [Ten], [SoDienThoai], [Tuoi], [Email], [MatKhau], [LoaiNguoiDung], [XacNhan], [Token], [MaNV]) VALUES (1013, N'037354738285', N'Trần Thanh Minh', N'0786547653', 31, N'phuta2@gmail.com', N'123456', N'Phụ tá', 1, NULL, 1012)
GO
SET IDENTITY_INSERT [dbo].[TaiKhoan] OFF
GO
