"use strict";

const customerDao = require("../dao/customer-dao");
const customerValidation = require("../validations/customer-validation");

exports.get = async (req, res, next) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint para obter clientes'
  try {
    let { search, page = 1, limit } = req.query;

    let { result, totalDocs, totalPages } = await customerDao.get(
      search,
      page,
      limit
    );
    /*  #swagger.responses[200] = {
                  description: "Retorna todos os clientes com busca e paginação.",
                  content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/customerArrayResponse"
                        }
                    }           
                }           
      }   
    */
    res.status(200).send({
      result,
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    });
  } catch (error) {
    console.log(`${new Date()} - (error) ${error}`);
    res.status(500).send({
      message:
        "Não foi possível processar sua solicitação, tente novamente mais tarde!",
    });
  }
};

exports.getById = async (req, res, next) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint para obter um cliente por ID'
  try {
    let { id } = req.params;

    let result = await customerDao.getById(id);
    /*  #swagger.responses[200] = {
                  description: "Retorna um  cliente por ID.",
                  content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/customerResponse"
                        }
                    }           
                }              
        }   
    */
    res.status(200).send(result);
  } catch (error) {
    console.log(`${new Date()} - (error) ${error}`);
    res.status(500).send({
      message:
        "Não foi possível processar sua solicitação, tente novamente mais tarde!",
    });
  }
};

exports.post = async (req, res, next) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint para criar cliente'
  try {
    let customerValidate = await customerValidation.validate(req.body);

    let data = await customerDao.create(customerValidate);
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/customerRequest"
                        }  
                    }
                }
            } 
    */

    /* #swagger.responses[201] = {
                  description: "Cria um cliente.",
                  content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/customerCreateResponse"
                        }
                    }           
                }                        
        }   
   */
    res.status(201).send({
      id: data._id,
      message: "Cadastro realizado com sucesso!",
    });
  } catch (e) {
    let codeStatus = 500;
    if (e.name && e.name === "ValidationError") {
      codeStatus = 400;
    }
    console.error(`${new Date()} - error:`, e);
    res.status(codeStatus).send({
      message: e.message,
    });
  }
};

exports.put = async (req, res, next) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint para atualizar um cliente'
  try {
    let customerValidate = await customerValidation.validate(req.body);
    await customerDao.update(req.params.id, customerValidate);
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/customerRequest"
                        }  
                    }
                }
            } 
    */

    /*  #swagger.responses[200] = {
                  description: "Atualiza um cliente.",
                  content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/customerUpdateResponse"
                        }
                    }           
                } 
        }   
    */
    res.status(200).send({
      message: "Atualizado com sucesso!",
    });
  } catch (e) {
    console.error(`${new Date()} - error:`, e);
    let codeStatus = 500;
    if (e.name && e.name === "ValidationError") {
      codeStatus = 400;
    }
    console.error(`${new Date()} - error:`, e);
    res.status(codeStatus).send({
      message: e.message,
    });
  }
};

exports.delete = async (req, res, next) => {
  // #swagger.tags = ['Customer']
  // #swagger.description = 'Endpoint para deletar cliente'
  try {
    await customerDao.delete(req.params.id);
    /*  #swagger.responses[200] = {
                  description: "Deleta um cliente.",
                  content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/customerDeleteResponse"
                        }
                    }           
                }                 
              }   
          */
    res.status(200).send({
      message: "Removido com sucesso!",
    });
  } catch (e) {
    console.error(`${new Date()} - error:`, e);
    res.status(500).send({
      message:
        "Não foi possível processar sua solicitação, tente novamente mais tarde!",
    });
  }
};
