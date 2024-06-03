using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BE.Models;

public partial class SwpfinalContext : DbContext
{
    public SwpfinalContext()
    {
    }

    public SwpfinalContext(DbContextOptions<SwpfinalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<MessengerBox> MessengerBoxes { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductSize> ProductSizes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<Store> Stores { get; set; }

    public virtual DbSet<Table> Tables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);Database=swpfinal;UID=sa;PWD=123456;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.ToTable("Account");

            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.Cccd)
                .HasMaxLength(12)
                .HasColumnName("CCCD");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.StoreId).HasColumnName("StoreID");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Account_Role");

            entity.HasOne(d => d.Store).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.StoreId)
                .HasConstraintName("FK_Account_Store");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StatusDate).HasColumnName("statusDate");
        });

        modelBuilder.Entity<MessengerBox>(entity =>
        {
            entity.ToTable("MessengerBox");

            entity.Property(e => e.MessengerBoxId)
                .ValueGeneratedNever()
                .HasColumnName("MessengerBoxID");
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Order");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.StoreId).HasColumnName("StoreID");
            entity.Property(e => e.TableId).HasColumnName("TableID");

            entity.HasOne(d => d.Payment).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK_Order_Payment");

            entity.HasOne(d => d.Store).WithMany(p => p.Orders)
                .HasForeignKey(d => d.StoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_Store");

            entity.HasOne(d => d.Table).WithMany(p => p.Orders)
                .HasForeignKey(d => d.TableId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_Table");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.ToTable("OrderDetail");

            entity.Property(e => e.OrderDetailId).HasColumnName("Order_Detail_ID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductSizeId).HasColumnName("Product_SizeID");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrderDetail_Order");

            entity.HasOne(d => d.ProductSize).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductSizeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OrderDetail_Product_Size1");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PayId);

            entity.ToTable("Payment");

            entity.Property(e => e.PayId).HasColumnName("PayID");
            entity.Property(e => e.Payment1).HasColumnName("Payment");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.ToTable("Post");

            entity.Property(e => e.PostId)
                .ValueGeneratedNever()
                .HasColumnName("PostID");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Product");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.Img).HasColumnName("img");
            entity.Property(e => e.ModifileDate).HasColumnType("datetime");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StatusDate).HasColumnName("statusDate");
            entity.Property(e => e.StoreId).HasColumnName("StoreID");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Category");

            entity.HasOne(d => d.Store).WithMany(p => p.Products)
                .HasForeignKey(d => d.StoreId)
                .HasConstraintName("FK_Product_Store");
        });

        modelBuilder.Entity<ProductSize>(entity =>
        {
            entity.HasKey(e => e.ProductSizeId).HasName("PK_Product_Size_1");

            entity.ToTable("Product_Size");

            entity.Property(e => e.ProductSizeId).HasColumnName("Product_SizeID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.SizeId).HasColumnName("SizeID");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductSizes)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Size_Product");

            entity.HasOne(d => d.Size).WithMany(p => p.ProductSizes)
                .HasForeignKey(d => d.SizeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_Size_Size");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.ToTable("Size");

            entity.Property(e => e.SizeId).HasColumnName("SizeID");
            entity.Property(e => e.SizeName).HasMaxLength(50);
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<Store>(entity =>
        {
            entity.ToTable("Store");

            entity.Property(e => e.StoreId).HasColumnName("StoreID");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StatusDate).HasColumnName("statusDate");
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.ToTable("Table");

            entity.Property(e => e.TableId).HasColumnName("TableID");
            entity.Property(e => e.StoreId).HasColumnName("StoreID");

            entity.HasOne(d => d.Store).WithMany(p => p.Tables)
                .HasForeignKey(d => d.StoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Table_Store");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
