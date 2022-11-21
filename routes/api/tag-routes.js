const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll(
      {
        include: [{ model: Product, required: false, through: ProductTag, as: 'connect-tags' }]
      }
    )
    res.status(200).json(tags)
  }
  catch (err) {
    res.status(400).json({ msg: `No tags found` })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'connect-tags' }]
    })
    res.status(200).json(oneTag)
  }
  catch (err) {
    res.status(400).json({ msg: `Tag id ${req.params.id} not found` })
  }
});

router.post('/', (req, res) => {
  try {
    Tag.create(req.body);
    res.status(200).json({ msg: `New tag ${req.body.tag_name} was created!` });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong. Please try again." });
  }
})
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    })
  res.status(200).json({ msg: 'Tag updated' })
});

router.delete('/:id', (req, res) => {
  try {
    Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      })
    res.status(200).json({ msg: `Tag deleted` })
  }
  catch (err) {
    res.status(400).json({ msg: `Something went wrong. Please try again` })
  }
})

module.exports = router;
