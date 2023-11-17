document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const imageList = document.getElementById('imageList');
  
    // Função para carregar imagens
    async function loadImages() {
      const response = await fetch('/pictures/images');
      const data = await response.json();
  
      // Limpar a lista antes de adicionar novas imagens
      imageList.innerHTML = '';
  
      // Adicionar cada imagem à lista
      data.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `/uploads/${image.name}`;
        imgElement.alt = image.comment || 'No comment';
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger ms-2';
        deleteButton.addEventListener('click', () => deleteImage(image._id));
  
        const container = document.createElement('div');
        container.className = 'mb-3';
        container.appendChild(imgElement);
        container.appendChild(deleteButton);
        imageList.appendChild(container);
      });
    }
  
    // Função para excluir uma imagem
    async function deleteImage(id) {
      const response = await fetch(`/pictures/images/${id}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        alert('Imagem excluída com sucesso!');
        loadImages(); // Recarregar a lista após a exclusão
      } else {
        alert(`Erro: ${data.error}`);
      }
    }
  
    // Adicionar um ouvinte de evento para o formulário de upload
    uploadForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const response = await fetch('/pictures/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Imagem enviada com sucesso!');
        this.reset(); // Limpar o formulário após o upload
        loadImages(); // Recarregar a lista após o upload
      } else {
        alert(`Erro: ${data.error}`);
      }
    });
  
    // Carregar as imagens ao carregar a página
    loadImages();
  });
  