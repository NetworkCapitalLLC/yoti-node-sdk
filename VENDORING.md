# Yoti Node SDK - Edge Function Compatibility Assessment

## Executive Summary

**Can this library be built as a static asset for edge functions like Supabase + Deno?**

**❌ NO** - The Yoti Node SDK cannot be directly used in edge functions due to multiple fundamental incompatibilities.

## Compatibility Analysis

### Major Blocking Issues

#### 1. Node.js-Specific API Dependencies
The SDK heavily relies on Node.js core modules that are not available in edge environments:

- ~~**Filesystem Access**: `fs.readFileSync()` used in `src/request/request.builder.js:77` for PEM file loading~~ ✅ **REMOVABLE**
- ~~**Path Operations**: `path.join()` and `path.relative()` used throughout protobuf loading (`src/proto/root.js`)~~ ✅ **REMOVABLE**  
- **Crypto Module**: `crypto.createSign()` used for RSA-SHA256 signatures (`src/yoti_common/index.js:99`) ❌ **MAJOR BLOCKER**

#### 2. Native Cryptographic Dependencies
- **node-forge**: Heavy dependency on `node-forge` for RSA operations, AES encryption/decryption, and PEM processing ❌ **MAJOR BLOCKER**
- ~~**protobufjs**: Uses filesystem operations to dynamically load `.proto` definition files~~ ✅ **REMOVABLE**

#### 3. HTTP Client Dependencies
- **superagent**: HTTP client library not optimized for edge environments ⚠️ **REPLACEABLE**
- **form-data**: Node.js-specific form data handling ⚠️ **REPLACEABLE**

#### 4. Filesystem-Based Operations ✅ **REMOVABLE**
~~The SDK expects to:~~
- ~~Read PEM certificate files from disk (`withPemFilePath()` method)~~ - Can use `withPemString()` instead
- ~~Dynamically load protobuf definitions from filesystem~~ - Can pre-compile and bundle
- ~~Access configuration files during runtime~~ - Only in tests and examples

### Dependencies Assessment

| Dependency | Edge Compatible | Notes |
|------------|----------------|--------|
| `form-data@4.0.4` | ⚠️ | Node.js streams, but replaceable with Web FormData API |
| `node-forge@1.3.1` | ❌ | **MAJOR BLOCKER** - Core crypto operations incompatible |
| `protobufjs@7.5.2` | ✅ | Edge compatible when not using filesystem loading |
| `superagent@10.2.1` | ⚠️ | Replaceable with fetch API |
| `uuid@9.0.1` | ✅ | Edge compatible |

### Code Examples of Incompatibilities

#### Filesystem Access
```javascript
// src/request/request.builder.js:77
withPemFilePath(filePath) {
  return this.withPemString(fs.readFileSync(filePath, 'utf8'));
}
```

#### Native Crypto Usage
```javascript
// src/yoti_common/index.js:99
module.exports.getRSASignatureForMessage = (message, pem) => crypto
  .createSign('RSA-SHA256')
  .update(message)
  .sign(pem)
  .toString('base64');
```

#### Dynamic File Loading
```javascript
// src/proto/root.js:23
const root = ProtoBuf.loadSync(definitionsFiles);
```

## Filesystem Removal Feasibility ✅

**YES** - `fs.readFileSync()` can be completely removed from the SDK with the following approaches:

### 1. PEM File Loading (✅ EASILY REMOVABLE)
```javascript
// Current approach (fs-dependent):
const builder = new RequestBuilder().withPemFilePath('./path/to/cert.pem');

// Edge-compatible approach (already available):
const pemString = "-----BEGIN PRIVATE KEY-----\n...";
const builder = new RequestBuilder().withPemString(pemString);
```

### 2. Protobuf Definitions (✅ EASILY REMOVABLE)
```javascript
// Current approach (fs-dependent):
const root = ProtoBuf.loadSync(definitionsFiles); // Loads from filesystem

// Edge-compatible approach:
const root = ProtoBuf.Root.fromJSON(preCompiledDefinitions); // Use pre-compiled JSON
```

### 3. Test Data (✅ NON-BLOCKING)
All `fs.readFileSync()` usage in tests can be replaced with inline strings or imported constants.

## Remaining Major Blockers

### 1. Node.js Crypto Module ❌
```javascript
// src/yoti_common/index.js:99 - Cannot be easily replaced
crypto.createSign('RSA-SHA256').update(message).sign(pem)
```

### 2. node-forge Operations ❌
```javascript
// Complex RSA/AES operations throughout the codebase
forge.pki.privateKeyFromPem(pem)
forge.cipher.createDecipher('AES-CBC', key)
```

## Revised Migration Path

### Phase 1: Remove Filesystem Dependencies ✅ (Low Effort)
1. ~~Replace `withPemFilePath()` usage with `withPemString()`~~ - Already available
2. ~~Pre-compile protobuf definitions to JSON~~ - Standard protobufjs approach
3. ~~Convert test fixtures to inline data~~ - Refactoring only

### Phase 2: Replace HTTP Client ⚠️ (Medium Effort)
1. Replace `superagent` with `fetch` API
2. Replace `form-data` with Web `FormData` API

### Phase 3: Crypto Migration ❌ (Very High Effort)
1. Port Node.js crypto operations to Web Crypto API
2. Replace all node-forge cryptographic operations
3. Extensive testing and validation

## Updated Estimated Effort

- **Phase 1 (FS Removal)**: 1-2 days - Simple refactoring
- **Phase 2 (HTTP)**: 1-2 weeks - Moderate complexity  
- **Phase 3 (Crypto)**: 4-6 weeks - High risk, complex migration
- **Risk Level**: High - Core cryptographic operations still need complete rewrite

## Recommendations

1. **Use Server-Side**: Keep the current SDK on traditional Node.js servers
2. **Edge Proxy Pattern**: Create a lightweight edge function that proxies requests to a Node.js service running the full SDK
3. **Fork and Refactor**: Create a separate edge-compatible fork with significant modifications
4. **Alternative SDKs**: Look for Yoti SDKs specifically designed for edge/browser environments

## Build Configuration

The SDK currently has no bundling configuration (no webpack, rollup, or similar). It's designed as a traditional Node.js CommonJS library with the following characteristics:

- Uses CommonJS `require()` statements throughout
- No ES modules support
- No browser/edge-specific build targets
- Relies on Node.js runtime for all core functionality

## Conclusion

**Filesystem operations (`fs.readFileSync()`) can be completely removed** from the Yoti Node SDK with minimal effort (1-2 days). The SDK already provides edge-compatible alternatives:

- ✅ `withPemString()` instead of `withPemFilePath()`
- ✅ Pre-compiled protobuf definitions instead of filesystem loading
- ✅ All filesystem usage is non-essential (mainly in tests/examples)

However, the **core cryptographic operations remain the major blocker** for edge compatibility due to heavy reliance on Node.js crypto module and node-forge for RSA/AES operations. While filesystem removal is trivial, full edge compatibility still requires significant crypto migration work.
