const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  }).then(categoryData => res.json(categoryData))
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ['category_id']
    },
    
  }).then(categoryData => res.json(categoryData))

});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(categoryData => res.json(categoryData))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where:{ id: req.params.id }
     }).then(categoryData => {
       if(!categoryData){
         res.status(404).json({message: 'No category found'})
         return;
       }
       res.json(categoryData)
     })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  }).then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'No category found'})
      return;
    }
    res.json(categoryData)
  })
});

module.exports = router;
