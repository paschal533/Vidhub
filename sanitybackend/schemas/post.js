export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'videoLink',
      title: 'VideoLink',
      type: 'string',
    },
    {
      name: 'tokenID',
      title: 'TokenID',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
    },
    {
      name: 'seller',
      title: 'Seller',
      type: 'string',
    },
    {
      name: 'owner',
      title: 'Owner',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'comment'}],
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
  ],
}
