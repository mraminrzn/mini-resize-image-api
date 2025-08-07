<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo">
  <h1 align="center">Image Processing API</h1>
</div>

<p align="center">
  A NestJS-based API for uploading, processing, and managing images. This project provides endpoints to upload single or multiple images, with options to dynamically resize, change format, and organize them into folders. It uses the powerful <b>sharp</b> library for efficient image processing.
</p>

<hr>

<h2>✨ Features</h2>
<ul>
  <li>🖼️ <strong>Single &amp; Multiple Image Upload</strong>: Upload one or many images in a single request.</li>
  <li>📐 <strong>Dynamic Resizing</strong>: Specify width and height to resize images on the fly.</li>
  <li>🔄 <strong>Format Conversion</strong>: Convert images to <code>jpeg</code>, <code>png</code>, or <code>webp</code>.</li>
  <li>📁 <strong>Folder Organization</strong>: Save images to specific subdirectories.</li>
  <li>🗑️ <strong>Image Deletion</strong>: Remove uploaded images via the API.</li>
  <li>✅ <strong>Input Validation</strong>: Built-in validation for file size and type.</li>
</ul>

<hr>

<h2>🛠️ Technologies Used</h2>
<ul>
  <li><a href="https://nestjs.com/"><strong>NestJS</strong></a>: A progressive Node.js framework for building efficient, scalable server-side applications.</li>
  <li><a href="https://www.typescriptlang.org/"><strong>TypeScript</strong></a>: A typed superset of JavaScript that compiles to plain JavaScript.</li>
  <li><a href="https://sharp.pixelplumbing.com/"><strong>Sharp</strong></a>: High-performance Node.js image processing library.</li>
</ul>

<hr>

<h2>🚀 Getting Started</h2>
<h3>Project Setup</h3>
<ol>
  <li>Clone the repository:
    <pre><code>git clone &lt;your-repository-url&gt;
cd &lt;repository-folder&gt;</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
</ol>
<h3>Running the Application</h3>
<pre><code># Development mode
$ npm run start

# Watch mode (reloads on file change)
$ npm run start:dev

# Production mode
$ npm run start:prod</code></pre>
<p>The application will be running on <code>http://localhost:3000</code>.</p>

<hr>

<h2>📖 API Documentation</h2>
<p>The server exposes the following endpoints for image manipulation.</p>

<h3>1. Upload Single Image</h3>
<p>Uploads a single image, processes it based on optional parameters, and saves it.</p>
<ul>
  <li><strong>Endpoint</strong>: <code>POST /single-file</code></li>
  <li><strong>Request Type</strong>: <code>multipart/form-data</code></li>
  <li><strong>Validation</strong>: The default validator is set to only accept <code>image/png</code> files with a maximum size of <strong>5MB</strong>.</li>
</ul>
<h4>Form Data Parameters</h4>
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>file</code></td>
      <td><code>file</code></td>
      <td><strong>Yes</strong></td>
      <td>The image file to upload.</td>
    </tr>
    <tr>
      <td><code>folder</code></td>
      <td><code>string</code></td>
      <td>No</td>
      <td>Name of the folder to save the image in (e.g., <code>avatars</code>).</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td><code>number</code></td>
      <td>No</td>
      <td>The desired width to resize the image to. Requires <code>height</code>.</td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td><code>number</code></td>
      <td>No</td>
      <td>The desired height to resize the image to. Requires <code>width</code>.</td>
    </tr>
    <tr>
      <td><code>imageType</code></td>
      <td><code>enum</code></td>
      <td>No</td>
      <td>The output format. Can be <code>jpeg</code>, <code>png</code>, or <code>webp</code>.</td>
    </tr>
  </tbody>
</table>
<h4>Example Request (cURL)</h4>
<pre><code>curl -X POST http://localhost:3000/single-file \
  -F "file=@/path/to/your/image.png" \
  -F "folder=profile-pics" \
  -F "width=200" \
  -F "height=200" \
  -F "imageType=webp"</code></pre>
<h4>Success Response</h4>
<pre><code>{
  "url": "http://localhost:3000/files/profile-pics/1722953279000-image.webp"
}</code></pre>

<hr>

<h3>2. Upload Multiple Images</h3>
<p>Uploads multiple images and applies the same processing options to all of them.</p>
<ul>
  <li><strong>Endpoint</strong>: <code>POST /multiple-file</code></li>
  <li><strong>Request Type</strong>: <code>multipart/form-data</code></li>
</ul>
<h4>Form Data Parameters</h4>
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>files</code></td>
      <td><code>file[]</code></td>
      <td><strong>Yes</strong></td>
      <td>An array of image files to upload.</td>
    </tr>
    <tr>
      <td><code>folder</code></td>
      <td><code>string</code></td>
      <td>No</td>
      <td>Name of the folder where all images will be saved.</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td><code>number</code></td>
      <td>No</td>
      <td>The desired width to resize all images to. Requires <code>height</code>.</td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td><code>number</code></td>
      <td>No</td>
      <td>The desired height to resize all images to. Requires <code>width</code>.</td>
    </tr>
    <tr>
      <td><code>imageType</code></td>
      <td><code>enum</code></td>
      <td>No</td>
      <td>The output format for all images (<code>jpeg</code>, <code>png</code>, or <code>webp</code>).</td>
    </tr>
  </tbody>
</table>
<h4>Example Request (cURL)</h4>
<pre><code>curl -X POST http://localhost:3000/multiple-file \
  -F "files=@/path/to/your/image1.jpg" \
  -F "files=@/path/to/your/image2.png" \
  -F "folder=gallery" \
  -F "imageType=jpeg"</code></pre>
<h4>Success Response</h4>
<pre><code>[
  "http://localhost:3000/files/gallery/1722953379000-image1.jpeg",
  "http://localhost:3000/files/gallery/1722953379001-image2.jpeg"
]</code></pre>

<hr>

<h3>3. Delete Image</h3>
<p>Deletes a specific image from the server using its URL.</p>
<ul>
  <li><strong>Endpoint</strong>: <code>DELETE /single-file</code></li>
</ul>
<h4>Query Parameters</h4>
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>url</code></td>
      <td><code>string</code></td>
      <td><strong>Yes</strong></td>
      <td>The full URL of the image to delete, as returned by an upload endpoint.</td>
    </tr>
  </tbody>
</table>
<h4>Example Request (cURL)</h4>
<p><em>Note: Ensure the URL in the query parameter is properly encoded.</em></p>
<pre><code>curl -X DELETE "http://localhost:3000/single-file?url=http://localhost:3000/files/profile-pics/1722953279000-image.webp"</code></pre>
<h4>Success Response</h4>
<pre><code>{
  "message": "Image deleted successfully"
}</code></pre>

<hr>

<h2>📄 License</h2>
<p>This project is <a href="https://github.com/nestjs/nest/blob/master/LICENSE">MIT licensed</a>.</p>
