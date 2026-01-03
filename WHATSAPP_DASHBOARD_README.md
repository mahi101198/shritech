# WhatsApp Chatbot Dashboard 🚀

A comprehensive WhatsApp Business API dashboard for Shriram Tech Solutions, built with Next.js frontend and FastAPI backend.

## 🌟 Features

### ✅ **Live Chat Management**
- Real-time WhatsApp conversations view
- Message history and customer details
- Send/receive messages directly from dashboard
- WebSocket integration for live updates
- Unread message notifications

### ✅ **Message Templates**
- Create and manage reusable message templates
- Category-based organization (greeting, services, pricing, etc.)
- One-click template sending
- Template preview and editing

### ✅ **Bulk Messaging**
- CSV upload for recipient lists
- Step-by-step bulk message composer
- Progress tracking with real-time status updates
- Campaign history and analytics
- Failed message retry capabilities

### ✅ **Authentication & Security**
- JWT-based authentication
- Secure API endpoints
- Role-based access control
- Session management

### ✅ **Real-time Updates**
- WebSocket connection for live chat updates
- Real-time bulk message progress
- Instant notifications
- Auto-refresh capabilities

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│   Next.js       │◄──►│   FastAPI        │◄──►│   PostgreSQL    │
│   Frontend      │    │   Backend        │    │   Database      │
│                 │    │                  │    │                 │
│ - Dashboard UI  │    │ - REST APIs      │    │ - Conversations │
│ - Auth System   │    │ - WebSocket      │    │ - Templates     │
│ - State Mgmt    │    │ - WhatsApp API   │    │ - Bulk Logs     │
│                 │    │ - LangGraph+LLM  │    │ - Customers     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Backend Setup (FastAPI)

1. **Navigate to your existing chatbot directory:**
   ```bash
   cd C:\Users\pyada\chatbot
   ```

2. **Install additional dependencies:**
   ```bash
   pip install python-jose[cryptography] passlib[bcrypt]
   ```

3. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup (Next.js)

1. **Navigate to your frontend directory:**
   ```bash
   cd C:\Users\pyada\shriramTecholutions
   ```

2. **Install new dependencies:**
   ```bash
   npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast zustand socket.io-client axios class-variance-authority clsx tailwind-merge react-hook-form react-dropzone papaparse @types/papaparse
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the dashboard:**
   - Open http://localhost:3000/chatbot-dashboard
   - Login with: `username: admin`, `password: password`

## 🔧 Configuration

### Environment Variables

Create or update `.env.local` in your Next.js project:

```env
# FastAPI Backend Configuration
FASTAPI_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE=http://localhost:3000/api
NEXT_PUBLIC_WS_BASE=ws://localhost:8000

# Dashboard Configuration
NEXT_PUBLIC_DASHBOARD_TITLE=WhatsApp Chatbot Dashboard
NEXT_PUBLIC_COMPANY_NAME=Shriram Tech Solutions
```

### Backend Configuration

Update your `config.yaml` or environment variables:

```yaml
dashboard:
  admin_username: admin
  admin_password: your-secure-password

database:
  url: "postgresql://user:password@localhost/whatsapp_db"  # or SQLite
  echo: false
```

## 📱 API Endpoints

### Authentication
- `POST /dashboard/login` - Login with username/password
- Returns JWT token for API access

### Chat Management
- `GET /dashboard/conversations` - List recent conversations
- `GET /dashboard/messages/{user_id}` - Get chat history
- `POST /dashboard/send_message` - Send message to customer

### Templates
- `GET /dashboard/templates` - List all templates
- `POST /dashboard/templates` - Create new template
- `POST /dashboard/send_template` - Send template to customer

### Bulk Messaging
- `POST /dashboard/bulk_send` - Start bulk message campaign
- `POST /dashboard/bulk_upload` - Upload CSV recipients
- `GET /dashboard/bulk_status/{id}` - Get campaign status

### WebSocket
- `WS /dashboard/ws/chat` - Real-time updates

## 🗄️ Database Schema

The system automatically creates these tables:

### Core Tables
- **customers** - Customer information and WhatsApp IDs
- **conversations** - Message history and metadata
- **tickets** - Support ticket management

### Dashboard Tables
- **message_templates** - Reusable message templates
- **bulk_messages** - Bulk messaging campaigns
- **bulk_message_recipients** - Individual recipient tracking

## 📊 Features Breakdown

### 1. Live Chat Interface

```typescript
// Real-time message handling
const { conversations, messages, sendMessage } = useDashboardStore();

// WebSocket integration
const { isConnected } = useWebSocket();
```

### 2. Template Management

```typescript
// Template CRUD operations
const templates = await fetchTemplates();
await createTemplate({
  name: 'welcome_message',
  title: 'Welcome to Shriram Tech',
  content: 'Welcome! How can we help you today?',
  category: 'greeting'
});
```

### 3. Bulk Messaging

```typescript
// Bulk message workflow
const phoneNumbers = parseCSV(csvContent);
const campaignId = await createBulkMessage({
  campaign_name: 'Monthly Newsletter',
  message_content: 'Check out our latest updates!',
  phone_numbers: phoneNumbers
});
```

## 🎨 UI Components

### Tech Stack
- **Framework:** Next.js 13+ with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Zustand
- **Icons:** Lucide React
- **Real-time:** Native WebSocket

### Key Components
- `LiveChat` - Chat interface with message history
- `Templates` - Template management with grid view
- `BulkMessaging` - Multi-step bulk message wizard
- `LoginForm` - JWT authentication
- `LoadingSpinner` - Consistent loading states
- `ErrorAlert` - Error handling and display

## 🔐 Security Features

- **JWT Authentication** - Secure API access
- **Input Validation** - Phone number and message validation
- **CORS Configuration** - Proper cross-origin settings
- **Error Handling** - Comprehensive error management
- **Rate Limiting** - Built-in FastAPI rate limiting

## 🚀 Deployment

### Production Deployment

1. **Backend (FastAPI):**
   ```bash
   # Install production server
   pip install gunicorn
   
   # Start production server
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --host 0.0.0.0 --port 8000
   ```

2. **Frontend (Next.js):**
   ```bash
   # Build for production
   npm run build
   
   # Start production server
   npm start
   ```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile for FastAPI backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Vercel Deployment

Your Next.js frontend can be easily deployed to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📈 Monitoring & Analytics

### Built-in Metrics
- Message delivery rates
- Response times
- User engagement
- Campaign performance
- Error tracking

### Integration Options
- Google Analytics (already configured)
- Custom analytics endpoints
- Performance monitoring
- Error logging services

## 🧪 Testing

### Backend Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest tests/
```

### Frontend Tests
```bash
# Install test dependencies
npm install --save-dev jest @testing-library/react

# Run tests
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check NEXT_PUBLIC_WS_BASE environment variable
   - Verify FastAPI WebSocket endpoint is running
   - Check firewall/proxy settings

2. **API Authentication Errors**
   - Verify JWT token generation
   - Check API base URL configuration
   - Confirm credentials (admin/password for demo)

3. **Database Connection Issues**
   - Check database URL in config
   - Verify database is running
   - Check table creation/migration status

4. **WhatsApp API Issues**
   - Verify WhatsApp Business API credentials
   - Check phone number format (+country code)
   - Confirm webhook URL configuration

### Debug Mode

Enable debug logging:

```python
# In your FastAPI config
logging.basicConfig(level=logging.DEBUG)
```

## 🔄 Updates & Maintenance

### Regular Maintenance
- Update dependencies monthly
- Monitor API rate limits
- Clean up old conversation data
- Backup template configurations
- Review security settings

### Feature Updates
The dashboard is designed to be easily extensible. Add new features by:
1. Creating new API endpoints in FastAPI
2. Adding corresponding frontend components
3. Updating the Zustand store
4. Testing the integration

## 📝 License & Support

This dashboard is built specifically for Shriram Tech Solutions' WhatsApp Business integration.

### Support Channels
- **Documentation:** This README
- **Issues:** GitHub Issues (if using version control)
- **Email:** support@shritech.digital

---

**Built with ❤️ for Shriram Tech Solutions**

*Transforming customer communication with AI-powered WhatsApp automation*
