import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function PtDropzone(props) {
  const { t } = useTranslation('common');
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState(null);
  const maxSize = 8848576;
  const onDrop = useCallback(
    acceptedFiles => {
      let uploadedfiles = acceptedFiles.map(file => {
        if (file.size < maxSize) {
          return file;
        }
      });
      if (uploadedfiles[0]) {
        props.onUpload && props.onUpload(uploadedfiles);
        if (props.multiple) setFiles(files.concat(uploadedfiles));
        else setFiles(uploadedfiles);
      }
    },
    [files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: props.maxFiles,
    accept: 'image/jpeg,image/png',
  });

  function imageLoaded(index) {
    let imagePreview = document.querySelectorAll('.dz-preview')[index];
    imagePreview.classList.add('dz-success', 'dz-complete');
    imagePreview.querySelector('.dz-upload').style.width = '100%';
  }

  function removeFile(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setFiles(files.filter(file => file.id !== id));
    props.onRemove && props.onRemove(id);
  }

  useEffect(() => {
    props && props.defaultValue && defaultValue(props.defaultValue);
  }, [props]);

  function defaultValue(data) {
    if (typeof data === Array) {
      data.forEach(file => {
        setFiles(files.concat(data));
      });
    }

    if (typeof data === 'string') {
      setUrl(data);
    }
  }

  return (
    <>
      <div
        className={`dropzone-modern dz-square dz-clickable dropzone ${
          files.length ? 'dz-started' : ''
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {!url && (
          <span className="dropzone-upload-message text-center">
            <i className="bx bxs-cloud-upload"></i>
            <b className="text-color-primary">{t('UPLOAD_IMAGE')}</b>
          </span>
        )}
        {files[0] &&
          files.map((file, index) => (
            <div
              className="dz-image-preview dz-preview dz-processing"
              key={`preview-${index}`}
            >
              <div className="dz-image">
                <LazyLoadImage
                  src={URL.createObjectURL(file)}
                  alt={t('IMAGE_VIEW')}
                  afterLoad={() => imageLoaded(index)}
                />
              </div>
              <div className="dz-details">
                <div className="dz-size">
                  <span>{(file.size / (1024 * 1024)).toFixed(2)}</span> MB
                </div>
                <div className="dz-filename">
                  <span>{file.name}</span>
                </div>
              </div>
              <div className="dz-progress">
                <span className="dz-upload"></span>
              </div>
              <a
                className="dz-remove"
                href="#remove"
                onClick={e => removeFile(e, file.id)}
              >
                {t('IMAGE_DELETE')}
              </a>
            </div>
          ))}

        {url && (
          <div
            className="dz-image-preview dz-preview dz-processing"
            key={`preview-${0}`}
          >
            <div className="dz-image">
              <LazyLoadImage src={url} alt={t('IMAGE_VIEW')} />
            </div>
            <a
              className="dz-remove"
              href="#remove"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setUrl(null);
              }}
            >
              <i
                class="bx bxs-trash bx-tada"
                style={{
                  fontSize: '48px',
                  position: 'absolute',
                  top: 50,
                  left: '45%',
                  zIndex: 10,
                  color: '#FFF',
                }}
              ></i>
              {t('IMAGE_DELETE')}
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default PtDropzone;
