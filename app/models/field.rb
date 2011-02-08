class Field
  include MongoMapper::EmbeddedDocument

  key :type, String
  key :label, String
  key :help, String
end
