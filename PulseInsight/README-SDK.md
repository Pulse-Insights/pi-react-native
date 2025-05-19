# PulseInsight React Native SDK

React Native SDK for PulseInsight analytics platform.

## Installation

```sh
npm install pulse-insight-react-native
# or
yarn add pulse-insight-react-native
```

### iOS

```sh
cd ios && pod install
```

## Usage

```typescript
import PulseInsight from 'pulse-insight-react-native';

// 初始化SDK
const pulseInsight = new PulseInsight({ apiKey: 'YOUR_API_KEY' });
await pulseInsight.initialize();

// 记录事件
pulseInsight.trackEvent('button_click', { buttonId: 'submit_button' });
```

## API

### `new PulseInsight(options)`

创建PulseInsight SDK实例。

**参数**:
- `options`: 对象，包含:
  - `apiKey`: 字符串，必须，您的API密钥

### `initialize()`

初始化SDK并连接到原生平台。

**返回值**:
- `Promise<boolean>`: 初始化成功返回true，失败返回false

### `trackEvent(eventName, properties)`

跟踪用户事件。

**参数**:
- `eventName`: 字符串，事件名称
- `properties`: 对象(可选)，事件关联的属性

## License

MIT 