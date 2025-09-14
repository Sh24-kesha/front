document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    const journeyBoard = document.getElementById('journeyBoard');
    
    data.tasks.forEach(task => {
      const taskElement = createTaskContainer(task);
      journeyBoard.appendChild(taskElement);
    });
  } catch (error) {
    console.error('Error loading JSON:', error);
    document.getElementById('journeyBoard').innerHTML = '<p>Error loading tasks. Check data.json.</p>';
  }
});

function createTaskContainer(task) {
  const card = document.createElement('article');
  card.className = 'task-card';
  card.id = `task-${task.id}`;
  
  const header = document.createElement('header');
  header.className = 'task-header';
  header.innerHTML = `
    <h2 class="task-title">${task.title}</h2>
    <span class="status-badge status-${task.status}">${task.status.replace('_', ' ').toUpperCase()}</span>
  `;
  
  const assetContainer = document.createElement('div');
  assetContainer.className = 'asset-container';
  if (task.asset.type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.src = task.asset.url;
    iframe.width = "100%";
    iframe.height = "315";
    iframe.title = "YouTube video player";
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    assetContainer.appendChild(iframe);
  } else if (task.asset.type === 'image') {
    const img = document.createElement('img');
    img.src = task.asset.url;
    img.alt = task.title;
    assetContainer.appendChild(img);
  }
  
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'expand-toggle';
  toggleBtn.textContent = 'View Description';
  toggleBtn.onclick = () => toggleDescription(toggleBtn);
  
  const description = document.createElement('div');
  description.className = 'expandable';
  description.innerHTML = `<p>${task.description}</p>`;
  
  card.appendChild(header);
  card.appendChild(assetContainer);
  card.appendChild(toggleBtn);
  card.appendChild(description);
  
  return card;
}

function toggleDescription(toggleBtn) {
  const description = toggleBtn.nextElementSibling;
  const isExpanded = description.classList.toggle('expanded');
  toggleBtn.textContent = isExpanded ? 'Hide Description' : 'View Description';
  toggleBtn.classList.toggle('expanded');
}