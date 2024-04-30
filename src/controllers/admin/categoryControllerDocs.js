//getAll method documentation

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations related to Categories
 */

/**
 * @swagger
 * /category/:
 *   get:
 *     summary: Get all categories with featured images
 *     description: Fetches all categories along with their associated featured images.
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: A successful response with categories data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the request.
 *                 data:
 *                   type: array
 *                   description: An array containing categories data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the category.
 *                       status:
 *                         type: string
 *                         description: The status of the category.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the category was created.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the category was last updated.
 *       '500':
 *         description: Internal server error.
 */


//getById method documentation

/**
 * @swagger
 * /category/:id:
 *   get:
 *     summary: Get category by ID with featured image
 *     description: Fetches a category by its ID along with its associated featured image.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to fetch.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response with category data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the request.
 *                 data:
 *                   type: object
 *                   description: The category data.
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the category.
 *                     status:
 *                       type: string
 *                       description: The status of the category.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the category was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the category was last updated.
 *                     featuredImage:
 *                       type: object
 *                       description: The featured image associated with the category.
 *                       properties:
 *                         // Include properties of the featured image here
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */

//create method documentation

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new category with a featured image
 *     description: Creates a new category with the provided name and associated featured image.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be associated with the category.
 *     responses:
 *       '200':
 *         description: A successful response with the created category data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the request.
 *                 data:
 *                   type: object
 *                   description: The created category data.
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the category.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the category was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the category was last updated.
 *       '400':
 *         description: Bad request. Indicates an error while creating the category or if a category with the same name already exists.
 *       '500':
 *         description: Internal server error.
 */


//category update docs

/**
 * @swagger
 * /category/:id:
 *   put:
 *     summary: Update category by ID with a new featured image
 *     description: Updates a category by its ID with the provided data, including a new associated featured image.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the category.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The new image file to be associated with the category.
 *     responses:
 *       '200':
 *         description: A successful response indicating the category has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: A message describing the outcome of the request.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */


//delete function docs

/**
 * @swagger
 * /category/:id:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Deletes a category with the specified ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deletion was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Message indicating the result of the deletion operation
 *                   example: Successfully Deleted the category
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the deletion was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Message indicating the category was not found
 *                   example: Category Not found
 *       500:
 *         description: Internal server error
 */