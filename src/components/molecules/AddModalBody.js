import React, { useState, useEffect } from 'react';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addOrUpdateCar } from 'actions/offerActions';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Box, IconButton, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  imgNames: {
    display: 'block',
  },
  imgNamesName: {
    marginLeft: 5,
    marginRight: 'auto',
  },
  iconButton: {
    padding: 0,
    marginRight: 2,
    marginBottom: '3px',
  },
  iconButtonOnImg: {
    padding: 4,
  },
  imagesBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter offers title')
    .required('Title is required')
    .min(2, 'Minimum 2 characters length'),
  year: yup
    .string('Enter cars production year')
    .min(4, 'Minimum 4 characters length')
    .required('Year is required'),
});

const AddModalBody = React.forwardRef(({ context, addFn }, ref) => {
  const startUploadImageLimit = 10;
  const { editedOfferValues, setAddingOpen } = context;
  const classes = useStyles();
  const [uploadImagesLimit, setUploadImagesLimit] = useState(startUploadImageLimit);
  const [currendImagesUrls, setCurrendImagesUrls] = useState(editedOfferValues?.imagesUrls ?? [])
  const [imagesObjs, setImagesObjs] = useState([])
  const [uploadingAllowed, setUploadingAllowed] = useState(true)

  useEffect(() => {
    setUploadImagesLimit(startUploadImageLimit - currendImagesUrls.length - imagesObjs.length);
    if (uploadImagesLimit <= 0) setUploadingAllowed(false)
    else setUploadingAllowed(true)
  }, [imagesObjs, currendImagesUrls, uploadImagesLimit])

  const handleAddImages = (e) => {
    let arr = []
    if (uploadingAllowed) {
      const uploadingFiles = e.target.files;
      Object.keys(uploadingFiles).forEach(file => {
        if (arr.length < uploadImagesLimit)
          arr.push({
            id: uploadingFiles[file].name + uploadingFiles[file].size + uploadingFiles[file].lastModified,
            name: uploadingFiles[file].name,
            size: uploadingFiles[file].size,
            file: uploadingFiles[file],
          })
      })
      setImagesObjs([...imagesObjs, ...arr])
    }
  }

  const handleRemoveImage = (imgId) => {
    const filteredImages = imagesObjs.filter(obj => obj.id !== imgId);
    const filteredCurrentImagesUrls = currendImagesUrls.filter(url => url !== imgId);
    setImagesObjs(filteredImages);
    setCurrendImagesUrls(filteredCurrentImagesUrls)
  }

  const formik = useFormik({
    initialValues: {
      name: editedOfferValues?.name ?? '',
      year: editedOfferValues?.year ?? '',
      seats: editedOfferValues?.seats ?? '',
      length: editedOfferValues?.length ?? '',
      description: editedOfferValues?.description ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await addFn({
        ...values,
        imagesObjs,
        currendImagesUrls,
        updating: editedOfferValues ? true : false,
        id: editedOfferValues?.id,
      });
      setAddingOpen(false)
    },
  });



  return (
    <Box className={classes.paper} ref={ref} tabIndex={-1}>
      <Typography variant="h4">Add an offer</Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          label="name"
          fullWidth
        />

        <TextField
          id="year"
          name="year"
          value={formik.values.year}
          onChange={formik.handleChange}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}
          label="year"
          fullWidth
        />

        <TextField
          id="length"
          name="length"
          value={formik.values.length}
          onChange={formik.handleChange}
          error={formik.touched.length && Boolean(formik.errors.length)}
          helperText={formik.touched.length && formik.errors.length}
          label="length"
          fullWidth
        />
        <TextField
          id="seats"
          name="seats"
          value={formik.values.seats}
          onChange={formik.handleChange}
          error={formik.touched.seats && Boolean(formik.errors.seats)}
          helperText={formik.touched.seats && formik.errors.seats}
          label="seats"
          fullWidth
        />
        <TextField
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          label="description"
          type="textarea"
          fullWidth
        />
        {uploadingAllowed &&
          <>
            <input
              id="images"
              accept="image/*"
              hidden
              multiple
              type="file"
              name="images"
              onChange={(e) => handleAddImages(e)}
            />
            <label htmlFor="images">
              <Button
                variant="contained"
                component="span">
                Upload photos
              </Button>
            </label>
          </>
        }
        <Typography>{uploadImagesLimit > 0 ? `you can add ${uploadImagesLimit} photos more` : 'no more photos allowed'}</Typography>
        {editedOfferValues &&
          <div className={classes.imagesBox}>
            <GridList cellHeight={100} className={classes.gridList} cols={3}>
              {currendImagesUrls.map((tile) => (
                <GridListTile key={tile} cols={1}>
                  <img src={tile} alt={tile} />
                  <GridListTileBar
                    actionIcon={
                      <IconButton
                        className={classes.iconButtonOnImg}
                        color="primary"
                        aria-label="remove picture"
                        component="span"
                        onClick={() => handleRemoveImage(tile)}>
                        <DeleteForeverIcon
                          fontSize="large" />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        }
        {
          imagesObjs && imagesObjs.map((obj, index) => (
            <Box
              key={obj.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                className={classes.iconButton}
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => handleRemoveImage(obj.id)}>
                <DeleteForeverIcon />
              </IconButton>
              <Typography className={classes.imgNames} variant="caption" >{`${index + 1}.  `}</Typography>
              <Typography className={classes.imgNamesName} variant="caption" >{obj.name}</Typography>
              <Typography className={classes.imgNames} variant="caption" >{`${(obj.size / 1024).toFixed(0)} kB`}</Typography>
            </Box>
          ))
        }


        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={formik.isSubmitting}>
          {editedOfferValues ? 'update' : 'add'}
        </Button>
      </form>
    </Box>
  )
})

AddModalBody.propTypes = {

}

const mapDispatchToProps = (dispatch) => ({
  addFn: async (values) => await dispatch(addOrUpdateCar(values))
})

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(withContext(AddModalBody));

