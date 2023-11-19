


document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');
  const imageList = document.getElementById('imageList');

  // Função para carregar imagens
  async function loadImages() {
    try {
      const response = await fetch('http://localhost:3000/pictures/images');

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        return;
      }

      // Tentar analisar o JSON apenas se a resposta não estiver vazia
      const responseData = await response.json();

      // Verificar se há dados válidos
      if (!responseData || !responseData.images) {
        console.error('Dados inválidos na resposta');
        return;
      }

      // Limpar a lista antes de adicionar novas imagens
      imageList.innerHTML = '';

      // Adicionar cada imagem à lista
      responseData.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `http://localhost:3000/uploads/${image.name}`;
        imgElement.alt = image.comment || 'No comment';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger ms-2';
        deleteButton.addEventListener('click', () => deleteImage(image._id));

        const commentContainer = document.createElement('div');
        commentContainer.textContent = `Comment: ${image.comment || 'No comment'}`;

        const container = document.createElement('div');
        container.className = 'mb-3';
        container.appendChild(imgElement);
        container.appendChild(commentContainer); // Adiciona o container de comentários
  
        container.appendChild(deleteButton);
        imageList.appendChild(container);
      });
    } catch (error) {
      console.error('Erro ao carregar imagens:', error.message);
    }
  }

  // Função para excluir uma imagem
  async function deleteImage(id) {
    try {
      const response = await fetch(`http://localhost:3000/pictures/images/${id}`, {
        method: 'DELETE',
      });

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        const responseData = await response.json();
        alert(`Erro: ${responseData.error}`);
        return;
      }

      // Atualizar a lista de imagens após a exclusão
      loadImages();
    } catch (error) {
      console.error('Erro ao excluir imagem:', error.message);
    }
  }

  // Event listener para o formulário de upload
  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(uploadForm);
    const response = await fetch('http://localhost:3000/pictures/upload', {
      method: 'POST',
      body: formData,
    });

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      const responseData = await response.json();
      alert(`Erro: ${responseData.error}`);
      return;
    }

    // Limpar o formulário após o upload e recarregar a lista de imagens
    uploadForm.reset();
    loadImages();
  });

  // Carregar as imagens ao carregar a página
  loadImages();
});
