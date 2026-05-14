# Login Site Playwright

`login-site` の GitHub Pages 公開ページを対象にした Playwright テストプロジェクトです。

## 対象

https://kikunori1212-cpu.github.io/login-site/

## セットアップ

```powershell
npm.cmd install
npx.cmd playwright install chromium
```

## テスト実行

```powershell
npm.cmd test
```

ブラウザを表示して実行:

```powershell
npm.cmd run test:headed
```

HTML レポート表示:

```powershell
npm.cmd run report
```

## テスト観点

[docs/test-viewpoints.md](docs/test-viewpoints.md) に ISTQB/JSTQB の考え方をもとにした観点を整理しています。
