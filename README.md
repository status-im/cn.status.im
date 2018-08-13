# Description

This repo creates the Status main Chinese page for https://cn.status.im.

# Usage

To develop the site use:
```
npm run develop
```

To build the site use:
```
npm run build
```
The build artifacts end up in `dist` folder.

# Continuous Integration

The deployment is handled by Jenkins(https://ci.status.im/) and configured via the [`Jenkinsfile`](./Jenkinsfile) and deployed via this job:
https://ci.status.im/job/misc/job/cn.status.im/
