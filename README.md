# ping-test-task

I created a small monorepo with Frontend that uses React and server that uses express js.

The reason why I created small server application (it has only one ping endpoint) is because browser does not allow us to send ping request because of security.

I had two ways how i think I could figure it out:
- create function that will work like a script and we will call it to get ping result (something like lambda function but locally);
- or create basic server and call it when we need the value;

The reason why I have chosen the second option is that I think it will be better for the structure of code. It will look more clean and straightforward for developers to read it.

I created plain monorepo just for simplicity to start it and keep it all in one repository.

The frontend has simple modular architecture for the small app, it contains the router navigation and two pages:
1. Add ping page
2. View pings page

## Getting Started

### Prerequisites

Install pnpm if you don't have it on your PC:

```bash
brew install pnpm
```

### Installation

Install packages:

```bash
pnpm install
```

### Environment Variables

#### Frontend Environment Variables

Create `.env` file in the `packages/client` directory:

```bash
cd packages/client
```

Copy and paste this content:
```env
VITE_BASE_URL=http://localhost:5000
```

#### Backend Environment Variables

Create `.env` file in the `packages/server` directory:

```bash
cd packages/server
```

Copy and paste this content:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Running the Application

#### Start both frontend and backend:
```bash
pnpm run dev
```

#### Start only server:
```bash
cd packages/server
pnpm run dev
```

#### Start only frontend:
```bash
cd packages/client
pnpm run dev
```