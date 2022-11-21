const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll(
      {
        include: { model: Product }
      })
    res.status(200).json(categories)
  }
  catch (err) {
    res.status(400).json({ msg: `No categories found` })
  }

});

router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: { model: Product }
    })
    res.status(200).json(oneCategory)
  }
  catch (err) {
    res.status(400).json({ msg: `Category id ${req.params.id} not found` })
  }
});


router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create(req.body);
    res.status(200).json({ msg: `New category ${req.body.category_name} was created!` });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong. Please try again." });
  }
})

router.put('/:id', (req, res) => {
  try {
    Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      })
    res.status(200).json({ msg: `Category updated` })
  }
  catch (err) {
    res.status(400).json({ msg: `Something went wrong. Please try again` })
  }
}
)

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy(
      {
        where: {
          id: req.params.id
        }
      })
    res.status(200).json({ msg: `Category deleted` })
  }
  catch (err) {
    res.status(400).json({ msg: `Something went wrong. Please try again` })
  }
})

module.exports = router;
