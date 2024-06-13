import React from 'react';

const blogData = [
  {
    id: 0,
    title: "Hulk is best",
    description: "hbsahd asdb abjs dbas dbsa db",
    imageUrl: "https://static.wikia.nocookie.net/marveldatabase/images/b/b8/Incredible_Hulk_Vol_4_7_Textless.jpg/revision/latest?cb=20231210153342",
    authorId: 0,
    categoryId: 0,
    author: "HA",
    tags: "hahah",
    views: 0,
    createdAt: "2024-06-10 10:16:18.707",
    updatedAt: "2024-06-10 10:16:18.707",
    content: null
  },
  {
    id: 1,
    title: "Bí quyết pha chế hoàn hảo: Espresso của Highland Coffee",
    description: "Tận hưởng hương vị đậm đà và mạnh mẽ của espresso đặc trưng từ Highland Coffee. Lý tưởng cho những người yêu thích cà phê với hương vị đầy đặn và mạnh mẽ.",
    imageUrl: "https://file.hstatic.net/1000075078/file/thecoffeehouse_traxanhtaybac_8_2bff28c71b20486f875eb21fa39cd00d_grande.png?fbclid=IwZXh0bgNhZW0CMTAAAR1Gv9NuM4_AYW16sdRy5R8xXfnOjUvn52Ns5lfiQFaa8zPAUH0tf9Gzavw_aem_AbhfEbrEWH1vh8iugunZ_h2KP29TFQ4H_XR98A02fusws9o9iOcr1YkbPy8kpFdq_EHwxEnySf38CU8zA_snpep9",
    authorId: 1,
    categoryId: 1,
    author: "Nguyễn Văn A",
    tags: "cà phê, espresso, Highland Coffee",
    views: 0,
    createdAt: "2024-05-30 13:16:15.843",
    updatedAt: "2024-05-30 13:16:15.843",
    content: null
  },
  // ...add other objects here
];

const BlogDetail = () => {
  return (
    <div>
      <h1>Blog Detail</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Views</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {blogData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.imageUrl} alt={item.title} width="100" />
              </td>
              <td>{item.author}</td>
              <td>{item.tags}</td>
              <td>{item.views}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogDetail;