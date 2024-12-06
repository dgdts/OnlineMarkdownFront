const BASE_URL = 'http://127.0.0.1:9898/api/v1';

// 获取认证 token（这里需要根据您的认证方式来实现）
const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

// 通用请求头
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
});

export const noteService = {
  // 创建笔记
  createNote: async (noteData) => {
    try {
      const response = await fetch(`${BASE_URL}/note`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title: noteData.title,
          type: 'markdown',
          tags: noteData.tags || [],
          note: {
            content: noteData.content
          }
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // 获取笔记列表
  getNotes: async (page = 1, pageSize = 10) => {
    try {
      console.log('Fetching notes, page:', page, 'pageSize:', pageSize);
      const response = await fetch(
        `${BASE_URL}/notes?page=${page}&page_size=${pageSize}`, 
        {
          method: 'GET',
          headers: getHeaders(),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // 获取单个笔记
  getNote: async (id) => {
    try {
      console.log('Fetching note:', id);
      const response = await fetch(`${BASE_URL}/note?id=${id}&type=markdown`, {
        method: 'GET',
        headers: getHeaders()
      });
      const data = await response.json();
      console.log('Note data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  },

  // 获取笔记元数据
  getNoteMeta: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/notes?page=1&page_size=10`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const data = await response.json();
      // 从列表中找到对应的笔记元数据
      const noteMeta = data.data.notes.find(note => note.note_id === id);
      return { data: noteMeta };
    } catch (error) {
      console.error('Error fetching note meta:', error);
      throw error;
    }
  },

  // 更新笔记
  updateNote: async (noteData) => {
    try {
      const response = await fetch(`${BASE_URL}/note`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          id: noteData.id,
          version: noteData.version,  // 包含版本信息
          title: noteData.title,
          type: 'markdown',
          tags: noteData.tags,
          note: {
            content: noteData.content
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        // 处理版本冲突
        if (errorData.status === 409) {  // 假设 409 是版本冲突的状态码
          throw new Error('version conflict');
        }
        throw new Error(errorData.message || 'Failed to update note');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }
};

export const resourceService = {
  // 获取上传凭证
  getUploadToken: async (file) => {
    try {
      const request = {
        type: 1, // RESOURCE_TYPE_IMAGE
        filename: file.name,
        content_type: file.type,
        content_length: file.size,
        image_format: getImageFormat(file.type)
      };

      const response = await fetch(`${BASE_URL}/resources/upload/token`, {
        method: 'POST',
        headers: getHeaders(),  // 使用统一的请求头（包含认证信息）
        body: JSON.stringify(request)
      });

      return response.json();
    } catch (error) {
      console.error('Error getting upload token:', error);
      throw error;
    }
  },

  // 上传文件到 OSS
  uploadToOSS: async (url, file) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: file
      });
      return response.ok;
    } catch (error) {
      console.error('Error uploading to OSS:', error);
      throw error;
    }
  },

  // 获取资源访问地址
  getResourceUrl: async (objectKey) => {
    try {
      const response = await fetch(`${BASE_URL}/resources/${objectKey}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return response.json();
    } catch (error) {
      console.error('Error getting resource URL:', error);
      throw error;
    }
  }
};

// 工具函数
function getImageFormat(mimeType) {
  const formatMap = {
    'image/jpeg': 1,
    'image/png': 2,
    'image/gif': 3,
    'image/webp': 4
  };
  return formatMap[mimeType] || 0;
} 