USE [swpfinal]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[AccountID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[PassWord] [nvarchar](max) NOT NULL,
	[Status] [int] NOT NULL,
	[Email] [nvarchar](max) NULL,
	[FullName] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[Phone] [nchar](10) NULL,
	[RoleID] [int] NOT NULL,
	[Token] [nvarchar](max) NOT NULL,
	[IsDelete] [int] NULL,
	[StoreID] [int] NULL,
	[CCCD] [nvarchar](12) NULL,
	[StatusDate] [date] NULL,
	[DateStartWork] [date] NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](max) NOT NULL,
	[IsDelete] [int] NOT NULL,
	[status] [int] NULL,
	[dateDeleted] [date] NULL,
	[StoreId] [int] NULL,
	[dateCreated] [date] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conversation]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conversation](
	[ConversationID] [int] IDENTITY(1,1) NOT NULL,
	[UserChatFirstID] [int] NULL,
	[UserSecondID] [int] NULL,
 CONSTRAINT [PK_Conversation] PRIMARY KEY CLUSTERED 
(
	[ConversationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[MessID] [int] IDENTITY(1,1) NOT NULL,
	[CoverID] [int] NULL,
	[SensiderID] [int] NULL,
	[ContentChat] [nvarchar](max) NULL,
	[TimeStamp] [datetime] NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[MessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessengerBox]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MessengerBox](
	[MessengerBoxID] [int] NOT NULL,
	[MessengerDescription] [nvarchar](max) NULL,
	[Author] [nvarchar](max) NULL,
	[CreateDate] [datetime] NULL,
	[IsDelete] [int] NULL,
	[storeId] [int] NULL,
	[dateDeleted] [date] NULL,
 CONSTRAINT [PK_MessengerBox] PRIMARY KEY CLUSTERED 
(
	[MessengerBoxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime] NULL,
	[Status] [int] NOT NULL,
	[TableID] [int] NOT NULL,
	[StoreID] [int] NOT NULL,
	[PaymentID] [int] NULL,
	[Note] [nvarchar](max) NULL,
	[Total] [float] NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[Order_Detail_ID] [int] IDENTITY(1,1) NOT NULL,
	[Product_SizeID] [int] NOT NULL,
	[Quantity] [int] NULL,
	[Price] [float] NOT NULL,
	[Status] [int] NULL,
	[OrderID] [int] NOT NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[Order_Detail_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[PayID] [int] IDENTITY(1,1) NOT NULL,
	[Payment] [nvarchar](max) NOT NULL,
	[PaymentDesciption] [nvarchar](max) NOT NULL,
	[IsDelete] [int] NOT NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[PayID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Post]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Post](
	[PostID] [int] NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Contents] [nvarchar](max) NULL,
	[Img] [nvarchar](max) NULL,
	[IsPublished] [int] NOT NULL,
	[Author] [nvarchar](max) NULL,
	[Status] [int] NULL,
	[Tags] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiDate] [datetime] NOT NULL,
	[storeId] [int] NULL,
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[PostID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](max) NOT NULL,
	[CategoryID] [int] NOT NULL,
	[ModifileDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
	[img] [nvarchar](max) NULL,
	[price] [float] NULL,
	[IsDelete] [int] NULL,
	[StoreID] [int] NULL,
	[status] [int] NULL,
	[dateDeleted] [date] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Size]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Size](
	[Product_SizeID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [int] NOT NULL,
	[SizeID] [int] NOT NULL,
	[Quanity] [int] NULL,
	[Price] [float] NULL,
	[IsDelete] [int] NULL,
	[status] [int] NULL,
	[dateCreated] [date] NULL,
	[dateDeleted] [date] NULL,
 CONSTRAINT [PK_Product_Size_1] PRIMARY KEY CLUSTERED 
(
	[Product_SizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[IsDelete] [int] NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Size]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Size](
	[SizeID] [int] IDENTITY(1,1) NOT NULL,
	[SizeName] [nvarchar](50) NOT NULL,
	[Price] [float] NULL,
	[IsDelete] [int] NULL,
	[status] [int] NULL,
	[dateCreated] [date] NULL,
	[dateDeleted] [date] NULL,
 CONSTRAINT [PK_Size] PRIMARY KEY CLUSTERED 
(
	[SizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Store]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Store](
	[StoreID] [int] IDENTITY(1,1) NOT NULL,
	[StoreName] [nvarchar](max) NOT NULL,
	[Location] [nvarchar](max) NULL,
	[IsDelete] [int] NULL,
	[status] [int] NULL,
	[dateCreated] [date] NULL,
	[dateDeleted] [date] NULL,
 CONSTRAINT [PK_Store] PRIMARY KEY CLUSTERED 
(
	[StoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Table]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table](
	[TableID] [int] IDENTITY(1,1) NOT NULL,
	[TableName] [nvarchar](max) NOT NULL,
	[Status] [int] NOT NULL,
	[StoreID] [int] NOT NULL,
	[IsDelete] [int] NULL,
 CONSTRAINT [PK_Table] PRIMARY KEY CLUSTERED 
(
	[TableID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserChat]    Script Date: 7/15/2024 11:11:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserChat](
	[UserID] [int] NOT NULL,
	[Role] [int] NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_UserChat] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (1, N'Owner', N'123', 0, N'owner@gmail.com', N'Nguyễn van A', N'Ha Noi', N'0123456789', 1, N'abcdshshvvdcscsc', 0, 1, N'12312312', CAST(N'2024-06-01' AS Date), CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (2, N'Manager', N'123', 0, N'manager@gmail.com', N'Nguyễn van B', N'Ha Noi', N'0143456789', 2, N'sdhvbhsbvs', 1, 1, N'123123422', CAST(N'2024-06-01' AS Date), CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (3, N'Employee', N'123', 0, N'employee@gmail.com', N'Nguyễn van C', N'Ha Noi', N'0123457789', 3, N'sacassacsasw', 1, 1, N'12424232331', CAST(N'2024-07-08' AS Date), CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (10, N'kien', N'Abcd123!', 1, N'tranvukien124@gmail.com', N'Tran Vu Kien ', N'Ha Noi', N'0398347223', 2, N'vavavavavava', 0, 1, N'013232142142', NULL, CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (21, N'ABC', N'123', 1, N'Kien123@gmail.com', N'TVK', N'HN', N's12313213 ', 1, N'dnhnshsbabscn', 0, 1, NULL, CAST(N'2024-06-01' AS Date), CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (41, N'ABCDEF', N'123', 0, N'124@gmail.com', N'Kiên Trần Vũ', N'Chung cư Phenikaa', N'0398347229', 2, N'abcjsabcbsscs', 1, 8, N'023231124212', CAST(N'2024-06-01' AS Date), CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (42, N'ABCDEFBCH', N'123', 0, N'tranv5@gmail.com', N'Trần Vũ Kiên', N'Ha Noi', N'0398347222', 2, N'scjssjcnsjcnsc', 1, 2, NULL, CAST(N'2024-06-01' AS Date), CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (43, N'ABCDEFadcsacs', N'123', 1, N'bcg@gmail.com', N'ABC', N'Ha Noi', N'0398347231', 2, N'ascjbascjasbc', 0, 3, NULL, NULL, CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (44, N'Bao1', N'123', 1, N'Bao@gmail.com', N'vlb', N'Ha Noi', N'092847326 ', 3, N'', 0, 2, NULL, NULL, CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (45, N'abcsd', N'123', 1, N'tranvukien123231@fmail.com', N'Trần Vũ Kiên', N'Ha Noi', N'0398347244', 2, N'', 0, 2, NULL, NULL, CAST(N'2004-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (47, N'ABCDEFd', N'123', 0, N'tranvukien1252@gmail.com', N'Trần Vũ Kiên', N'Chung cư Phenikaa', N'0398347220', 2, N'', 1, 1, N'023424521234', CAST(N'2024-06-01' AS Date), CAST(N'2024-06-01' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (48, N'manager1', N'123', 1, N'ma1@gmail.com', N'manager1', N'Ha Nội', N'0398347221', 2, N'', 0, 2, N'098765432109', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (49, N'manager2', N'123', 1, N'ma2@gmail.com', N'Tra', N'Ha Noi', N'0398347224', 2, N'', 0, 9, N'098765432108', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (50, N'manager3', N'123', 1, N'ma3@gmail.com', N'manager3', N'Chung cư Phenikaa', N'0398347225', 2, N'', 0, 9, N'098765432107', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (51, N'Employee3', N'123', 0, N'tra12@gmail.com', N'Trần Vũ Kiên', N'Chung cư Phenikaa', N'0398347009', 3, N'', 1, 11, N'0232323122', CAST(N'2024-06-03' AS Date), CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (52, N'manager4', N'123', 1, N'ma4@Qgmail.com', N'manager 4', N'Ha Nội', N'0398309232', 2, N'', 0, 9, N'098765432101', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (53, N'manager5', N'123', 1, N'ma5@gmail.com', N'manager5', N'Ha Nội', N'0398347322', 2, N'', 0, 3, N'098765432102', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (54, N'manager6', N'123', 0, N'ma6@gmail.com', N'ma6', N'Chung cư Phenikaa', N'0398347211', 3, N'', 1, 11, N'0987654320', CAST(N'2024-06-03' AS Date), CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (55, N'manager7', N'123', 1, N'ma7@gmail.com', N'ma7', N'Chung cư Phenikaa', N'0398347234', 2, N'hhbhbhbcfcf', 0, 11, N'098765432199', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (56, N'baovl5', N'123', 1, N'baovl12445@gmail.com', N'baovl', N'Ha Nội', N'0328123445', 3, N'hhbhbhbcfcf', 0, 9, N'098765432324', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (57, N'manager3333333', N'123', 1, N'tranvukien125222@fmail.com', N'                                ', N'Chung cư Phenikaa', N'0398347124', 3, N'hhbhbhbcfcf', 0, 9, N'092544455566', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (58, N'manager10', N'123', 1, N'ma@gmail.com', N'aass', N'Ha Nội', N'0398341243', 2, N'hhbhbhbcfcf', 0, 8, N'098765434212', NULL, CAST(N'2024-06-03' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (59, N'ma10', N'123', 1, N'ma100@gmail.com', N'magaming', N'ha noi', N'0987654987', 2, N'F289B168C7E1625486C1F879380A4EC08AE457B9A29E526ADB06A9D946D63A73', 0, 10, N'012345678945', NULL, CAST(N'2024-06-05' AS Date))
INSERT [dbo].[Account] ([AccountID], [UserName], [PassWord], [Status], [Email], [FullName], [Address], [Phone], [RoleID], [Token], [IsDelete], [StoreID], [CCCD], [StatusDate], [DateStartWork]) VALUES (61, N'kien123', N'Qqanhkien123!', 1, N'tranvukien125@gmail.com', N'Tran Vu Kien', N'Ha Noi', N'0398347226', 2, N'E261B74AD0FB05603B6493D132EA0E7FA380F8D761EF17B489B3836B5A6AE352', 0, 2, N'024242323311', NULL, CAST(N'2024-07-15' AS Date))
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryID], [CategoryName], [IsDelete], [status], [dateDeleted], [StoreId], [dateCreated]) VALUES (1, N'trà sữa 3', 0, NULL, NULL, NULL, NULL)
INSERT [dbo].[Category] ([CategoryID], [CategoryName], [IsDelete], [status], [dateDeleted], [StoreId], [dateCreated]) VALUES (2, N'cà phê', 0, NULL, NULL, NULL, NULL)
INSERT [dbo].[Category] ([CategoryID], [CategoryName], [IsDelete], [status], [dateDeleted], [StoreId], [dateCreated]) VALUES (3, N'nước ép', 0, NULL, NULL, NULL, NULL)
INSERT [dbo].[Category] ([CategoryID], [CategoryName], [IsDelete], [status], [dateDeleted], [StoreId], [dateCreated]) VALUES (4, N'trà sữa 3', 0, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Conversation] ON 

INSERT [dbo].[Conversation] ([ConversationID], [UserChatFirstID], [UserSecondID]) VALUES (1, 50000, 1)
INSERT [dbo].[Conversation] ([ConversationID], [UserChatFirstID], [UserSecondID]) VALUES (2, 90000, 1)
INSERT [dbo].[Conversation] ([ConversationID], [UserChatFirstID], [UserSecondID]) VALUES (3, 20000, 1)
SET IDENTITY_INSERT [dbo].[Conversation] OFF
GO
INSERT [dbo].[MessengerBox] ([MessengerBoxID], [MessengerDescription], [Author], [CreateDate], [IsDelete], [storeId], [dateDeleted]) VALUES (1, N'adascasc', N'ádasd', CAST(N'2024-05-24T00:00:00.000' AS DateTime), 0, NULL, CAST(N'2024-07-02' AS Date))
INSERT [dbo].[MessengerBox] ([MessengerBoxID], [MessengerDescription], [Author], [CreateDate], [IsDelete], [storeId], [dateDeleted]) VALUES (2, N'Lam web xau voai', N'T la Trong day', CAST(N'2024-05-31T00:00:00.000' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[MessengerBox] ([MessengerBoxID], [MessengerDescription], [Author], [CreateDate], [IsDelete], [storeId], [dateDeleted]) VALUES (3, N'ádSDA', N'T la Trong day', CAST(N'2024-05-30T00:00:00.000' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[MessengerBox] ([MessengerBoxID], [MessengerDescription], [Author], [CreateDate], [IsDelete], [storeId], [dateDeleted]) VALUES (4, N'Lam web xau voai1', N'T la Trong day 1', CAST(N'2024-06-01T00:00:00.000' AS DateTime), NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (136, CAST(N'2024-07-07T18:17:11.860' AS DateTime), 0, 1, 1, 1, N'null', 61000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (137, CAST(N'2024-07-07T21:45:53.883' AS DateTime), 0, 1, 1, 1, N'null', 28000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (138, CAST(N'2024-07-07T23:48:16.737' AS DateTime), 0, 2, 1, 1, N'null', 40000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (139, CAST(N'2024-07-07T23:48:40.223' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (140, CAST(N'2024-07-08T00:00:26.070' AS DateTime), 0, 2, 1, 1, N'null', 31000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (141, CAST(N'2024-07-08T00:08:20.610' AS DateTime), 0, 2, 1, 1, N'null', 28000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (142, CAST(N'2024-07-08T00:32:09.307' AS DateTime), 0, 2, 1, 1, N'null', 28000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (143, CAST(N'2024-07-08T00:49:32.510' AS DateTime), 0, 2, 1, 1, N'null', 28000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (144, CAST(N'2024-07-08T10:23:37.810' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (145, CAST(N'2024-07-08T10:28:20.577' AS DateTime), 0, 2, 1, 1, N'null', 28000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (146, CAST(N'2024-07-08T10:28:51.100' AS DateTime), 0, 2, 1, 1, N'null', 45000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (147, CAST(N'2024-07-08T10:29:34.127' AS DateTime), 0, 2, 1, 1, N'null', 46000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (148, CAST(N'2024-07-08T10:38:00.693' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (149, CAST(N'2024-07-08T10:39:56.637' AS DateTime), 0, 3, 1, 1, N'null', 40000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (150, CAST(N'2024-07-08T10:52:41.040' AS DateTime), 0, 6, 1, 1, N'null', 40000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (151, CAST(N'2024-07-08T15:17:43.843' AS DateTime), 0, 2, 1, 1, N'null', 40000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (152, CAST(N'2024-07-08T15:18:34.947' AS DateTime), 0, 2, 1, 1, N'null', 89000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (153, CAST(N'2024-07-08T15:29:54.350' AS DateTime), 0, 2, 1, 1, N'null', 28000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (154, CAST(N'2024-07-08T15:31:08.857' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (155, CAST(N'2024-07-08T15:42:47.570' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (156, CAST(N'2024-07-08T15:54:49.287' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (157, CAST(N'2024-07-08T15:55:06.137' AS DateTime), 0, 2, 1, 1, N'null', 30000)
INSERT [dbo].[Order] ([OrderID], [Date], [Status], [TableID], [StoreID], [PaymentID], [Note], [Total]) VALUES (158, CAST(N'2024-07-08T16:17:57.923' AS DateTime), 0, 2, 1, 1, N'null', 45000)
SET IDENTITY_INSERT [dbo].[Order] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (243, 27, 1, 30000, 1, 136)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (244, 28, 1, 31000, 1, 136)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (245, 25, 1, 28000, 1, 137)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (246, 1, 1, 40000, 1, 138)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (247, 27, 1, 30000, 1, 139)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (248, 28, 1, 31000, 1, 140)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (249, 25, 1, 28000, 1, 141)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (250, 25, 1, 28000, 1, 142)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (251, 25, 1, 28000, 1, 143)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (252, 22, 1, 30000, 1, 144)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (253, 25, 1, 28000, 1, 145)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (254, 2, 1, 45000, 1, 146)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (255, 9, 1, 46000, 0, 147)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (256, 27, 1, 30000, -1, 148)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (257, 1, 1, 40000, 0, 149)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (258, 1, 1, 40000, 0, 150)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (259, 1, 1, 40000, 1, 151)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (260, 28, 1, 31000, 1, 152)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (261, 22, 1, 30000, 1, 152)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (262, 25, 1, 28000, 1, 152)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (263, 25, 1, 28000, 1, 153)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (264, 22, 1, 30000, 1, 154)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (265, 27, 1, 30000, 0, 155)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (266, 22, 1, 30000, 1, 156)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (267, 22, 1, 30000, 1, 157)
INSERT [dbo].[OrderDetail] ([Order_Detail_ID], [Product_SizeID], [Quantity], [Price], [Status], [OrderID]) VALUES (268, 2, 1, 45000, 1, 158)
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[Payment] ON 

INSERT [dbo].[Payment] ([PayID], [Payment], [PaymentDesciption], [IsDelete]) VALUES (1, N'Direct Payment', N'Payment method via direct payment', 0)
INSERT [dbo].[Payment] ([PayID], [Payment], [PaymentDesciption], [IsDelete]) VALUES (2, N'QR Code', N'Payment method via QR code', 0)
SET IDENTITY_INSERT [dbo].[Payment] OFF
GO
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (0, N'a', N'b', N'img', 0, N'Nguyễn van B', 1, N'dsad', CAST(N'2024-07-15T02:55:43.753' AS DateTime), CAST(N'2024-07-15T02:55:43.753' AS DateTime), 1)
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (1, N'Bí quyết pha chế hoàn hảo: Espresso của Highland Coffee', N'Tận hưởng hương vị đậm đà và mạnh mẽ của espresso đặc trưng từ Highland Coffee. Lý tưởng cho những người yêu thích cà phê với hương vị đầy đặn và mạnh mẽ.', N'https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9', 1, N'Nguyễn Văn A', NULL, N'cà phê, espresso, Highland Coffee', CAST(N'2024-05-30T13:16:15.843' AS DateTime), CAST(N'2024-05-30T13:16:15.843' AS DateTime), NULL)
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (2, N'Thưởng thức hương vị: Caramel Macchiato của Highland Coffee', N'Tận hưởng vị ngọt ngào và kem mịn của Caramel Macchiato từ Highland Coffee. Một sự kết hợp hoàn hảo giữa espresso, sữa hấp và siro caramel.', N'https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9', 1, N'Trần Thị B', NULL, N'cà phê, caramel macchiato, Highland Coffee', CAST(N'2024-05-30T13:16:15.850' AS DateTime), CAST(N'2024-05-30T13:16:15.850' AS DateTime), NULL)
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (3, N'Sảng khoái với Americano Đá của Highland Coffee', N'Giải nhiệt với Americano Đá của Highland Coffee. Một sự kết hợp tươi mát giữa espresso và nước lạnh, lý tưởng cho những ngày nắng nóng.', N'https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9', 1, N'Phạm Văn C', NULL, N'cà phê, americano đá, Highland Coffee', CAST(N'2024-05-30T13:16:15.857' AS DateTime), CAST(N'2024-05-30T13:16:15.857' AS DateTime), NULL)
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (4, N'Một chút hương vị nhiệt đới: Sinh tố Xoài của Highland Coffee', N'Tận hưởng hương vị nhiệt đới với Sinh tố Xoài từ Highland Coffee. Một sự kết hợp thú vị giữa xoài tươi, sữa chua và chút mật ong.', N'https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9', 1, N'Lê Thị D', NULL, N'sinh tố, xoài, Highland Coffee', CAST(N'2024-05-30T13:16:15.863' AS DateTime), CAST(N'2024-05-30T13:16:15.863' AS DateTime), NULL)
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (5, N'Thưởng thức Cappuccino Cổ Điển của Highland Coffee', N'Tận hưởng hương vị cổ điển của Cappuccino từ Highland Coffee. Một sự cân bằng hoàn hảo giữa espresso, sữa hấp và bọt sữa, mang đến cảm giác ấm áp.', N'https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9', 1, N'Tranh Văn E', NULL, N'cà phê, cappuccino, Highland Coffee', CAST(N'2024-05-30T13:16:15.863' AS DateTime), CAST(N'2024-05-30T13:16:15.863' AS DateTime), NULL)
INSERT [dbo].[Post] ([PostID], [Title], [Contents], [Img], [IsPublished], [Author], [Status], [Tags], [CreatedDate], [ModifiDate], [storeId]) VALUES (6, N'Tận hưởng sự thoải mái tuyệt đối với Sô-cô-la Nóng của Highland Coffee', N'Sưởi ấm với Sô-cô-la Nóng của Highland Coffee. Được làm từ sô-cô-la đậm đà, kem mịn và được phủ thêm kem tươi, đây là thức uống mang lại cảm giác thoải mái tuyệt đối.', N'https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9', 1, N'Nguyễn Văn F', NULL, N'sô-cô-la nóng, Highland Coffee', CAST(N'2024-05-30T13:16:15.867' AS DateTime), CAST(N'2024-05-30T13:16:15.867' AS DateTime), NULL)
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (5, N'Trà Sữa Chân Trâu', 1, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 30000, 0, 1, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (6, N'Trà Sữa Nuớng', 1, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 32000, 0, 1, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (7, N'Trà Sữa Ô Long', 1, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 34000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (8, N'Nuớc Ép Xoài', 3, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 25000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (9, N'Nuớc Ép Dưa Hấu', 3, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 22000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (10, N'Nuớc Ép Cam', 3, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 23000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (11, N'Nuớc Ép Táo', 3, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 24000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (12, N'Cà Phê Sữa', 2, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 20000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (13, N'Cà Phê Ðen', 2, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 18000, 0, NULL, NULL, NULL)
INSERT [dbo].[Product] ([ProductID], [ProductName], [CategoryID], [ModifileDate], [CreateDate], [img], [price], [IsDelete], [StoreID], [status], [dateDeleted]) VALUES (14, N'Bạc Xỉu', 2, NULL, CAST(N'2024-05-22T07:27:27.157' AS DateTime), N'https://lh6.googleusercontent.com/proxy/w5eYX2JtpUtg28K5A7c7fCPoLd5s3Ob-m2jOU0ajFudrGtTKjM0lXw2FBTow6GbJ_c5cQ2Y7oUFWIMJ18eAwTMLYs99cuRch09VzOy3zKLzyVb5Ce_puaMUY7kktRq3tI3rdXY4ag4ynKD3EP32mLpapDW3Ebv--LOcX', 21000, 0, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Product_Size] ON 

INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (1, 5, 1, 50, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (2, 5, 2, 50, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (3, 5, 3, 50, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (4, 6, 1, 50, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (5, 6, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (6, 6, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (7, 7, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (8, 7, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (9, 7, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (10, 8, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (11, 8, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (12, 8, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (13, 9, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (14, 9, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (15, 9, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (16, 10, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (17, 10, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (18, 10, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (19, 11, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (20, 11, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (21, 11, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (22, 12, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (23, 12, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (24, 12, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (25, 13, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (26, 13, 2, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (27, 13, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (28, 14, 1, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (29, 14, 3, 20, NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Product_Size] ([Product_SizeID], [ProductID], [SizeID], [Quanity], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (30, 14, 3, 20, NULL, 0, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Product_Size] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleID], [RoleName], [Description], [IsDelete]) VALUES (1, N'Owner', N'The owner of the organization', 0)
INSERT [dbo].[Role] ([RoleID], [RoleName], [Description], [IsDelete]) VALUES (2, N'Manager', N'Manager of a department', 0)
INSERT [dbo].[Role] ([RoleID], [RoleName], [Description], [IsDelete]) VALUES (3, N'Employee', N'Regular employee', 0)
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[Size] ON 

INSERT [dbo].[Size] ([SizeID], [SizeName], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (1, N'X', 10000, 0, NULL, NULL, NULL)
INSERT [dbo].[Size] ([SizeID], [SizeName], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (2, N'L', 15000, 0, NULL, NULL, NULL)
INSERT [dbo].[Size] ([SizeID], [SizeName], [Price], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (3, N'M', 12000, 0, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Size] OFF
GO
SET IDENTITY_INSERT [dbo].[Store] ON 

INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (1, N'store 101', N'nhà nàm', NULL, 0, NULL, NULL)
INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (2, N'Store 3', N'Example Location 1', 0, 1, NULL, NULL)
INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (3, N'store 3345', N'Ha Noi', 0, 0, NULL, NULL)
INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (8, N'store 4', N'HCM', 0, 1, NULL, NULL)
INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (9, N'store 5', N'Hoa Lac', 0, 1, NULL, NULL)
INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (10, N'Store 3', N'Ha Noi', 0, 1, NULL, NULL)
INSERT [dbo].[Store] ([StoreID], [StoreName], [Location], [IsDelete], [status], [dateCreated], [dateDeleted]) VALUES (11, N'Store 10', N'Ha Noi', 0, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Store] OFF
GO
SET IDENTITY_INSERT [dbo].[Table] ON 

INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (1, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (2, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (3, N'Table 6', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (4, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (5, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (6, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (7, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (8, N'Table 6', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (9, N'Table 6', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (10, N'Table 6', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (11, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (12, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (13, N'Table 4', 1, 1, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (14, N'Table 4', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (15, N'Table 6', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (16, N'Table 4', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (17, N'Table 4', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (18, N'Table 4', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (19, N'Table 4', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (20, N'Table 6', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (21, N'Table 6', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (22, N'Table 6', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (23, N'Table 4', 1, 2, 0)
INSERT [dbo].[Table] ([TableID], [TableName], [Status], [StoreID], [IsDelete]) VALUES (24, N'Table 4', 1, 2, 0)
SET IDENTITY_INSERT [dbo].[Table] OFF
GO
INSERT [dbo].[UserChat] ([UserID], [Role], [UserName]) VALUES (1, 1, N'shop 1')
INSERT [dbo].[UserChat] ([UserID], [Role], [UserName]) VALUES (2, 1, N'shop 2')
INSERT [dbo].[UserChat] ([UserID], [Role], [UserName]) VALUES (20000, 0, N'table: 2')
INSERT [dbo].[UserChat] ([UserID], [Role], [UserName]) VALUES (50000, 0, N'table: 5')
INSERT [dbo].[UserChat] ([UserID], [Role], [UserName]) VALUES (90000, 0, N'table: 9')
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Role]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Store] FOREIGN KEY([StoreID])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Store]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_Store] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_Store]
GO
ALTER TABLE [dbo].[Conversation]  WITH CHECK ADD  CONSTRAINT [FK_Conversation_UserChat] FOREIGN KEY([UserChatFirstID])
REFERENCES [dbo].[UserChat] ([UserID])
GO
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Conversation_UserChat]
GO
ALTER TABLE [dbo].[Conversation]  WITH CHECK ADD  CONSTRAINT [FK_Conversation_UserChat1] FOREIGN KEY([UserSecondID])
REFERENCES [dbo].[UserChat] ([UserID])
GO
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Conversation_UserChat1]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Conversation] FOREIGN KEY([CoverID])
REFERENCES [dbo].[Conversation] ([ConversationID])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Conversation]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_UserChat] FOREIGN KEY([SensiderID])
REFERENCES [dbo].[UserChat] ([UserID])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_UserChat]
GO
ALTER TABLE [dbo].[MessengerBox]  WITH CHECK ADD  CONSTRAINT [FK_MessengerBox_Store] FOREIGN KEY([storeId])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[MessengerBox] CHECK CONSTRAINT [FK_MessengerBox_Store]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Payment] FOREIGN KEY([PaymentID])
REFERENCES [dbo].[Payment] ([PayID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Payment]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Store] FOREIGN KEY([StoreID])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Store]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Table] FOREIGN KEY([TableID])
REFERENCES [dbo].[Table] ([TableID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Table]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Order] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Order] ([OrderID])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Order]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Product_Size1] FOREIGN KEY([Product_SizeID])
REFERENCES [dbo].[Product_Size] ([Product_SizeID])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Product_Size1]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Store] FOREIGN KEY([storeId])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Store]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[Category] ([CategoryID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Store] FOREIGN KEY([StoreID])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Store]
GO
ALTER TABLE [dbo].[Product_Size]  WITH CHECK ADD  CONSTRAINT [FK_Product_Size_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[Product_Size] CHECK CONSTRAINT [FK_Product_Size_Product]
GO
ALTER TABLE [dbo].[Product_Size]  WITH CHECK ADD  CONSTRAINT [FK_Product_Size_Size] FOREIGN KEY([SizeID])
REFERENCES [dbo].[Size] ([SizeID])
GO
ALTER TABLE [dbo].[Product_Size] CHECK CONSTRAINT [FK_Product_Size_Size]
GO
ALTER TABLE [dbo].[Table]  WITH CHECK ADD  CONSTRAINT [FK_Table_Store] FOREIGN KEY([StoreID])
REFERENCES [dbo].[Store] ([StoreID])
GO
ALTER TABLE [dbo].[Table] CHECK CONSTRAINT [FK_Table_Store]
GO
