$(function(){

	var operacao = "A"; 

	var indice = -1;

	var tbLivros = localStorage.getItem("tbLivros");

	tbLivros = JSON.parse(tbLivros); 

	if(tbLivros == null) 
		tbLivros = [];

	function Adicionar(){
		var livro = GetLivro("Codigo", $("#txtCodigo").val());

		if(livro != null){
			alert("Código já cadastrado.");
			return;
		}

		var book = JSON.stringify({
			Codigo   : $("#txtCodigo").val(),
			Titulo     : $("#txtTitulo").val(),
			Autor : $("#txtAutor").val(),
			Ano    : $("#txtAno").val(),
			Genero : $("#txtGenero").val(),
			Pagina : $("#txtPagina").val()
		});

		tbLivros.push(book);

		localStorage.setItem("tbLivros", JSON.stringify(tbLivros));

		alert("Registro adicionado.");
		return true;
	}

	function Editar(){
		tbLivros[indice] = JSON.stringify({
					Codigo : $("#txtCodigo").val(),
					Titulo : $("#txtTitulo").val(),
					Autor  : $("#txtAutor").val(),
					Ano    : $("#txtAno").val(),
					Genero : $("#txtGenero").val(),
					Pagina : $("#txtPagina").val()
			});
		localStorage.setItem("tbLivros", JSON.stringify(tbLivros));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Código</th>"+
			"	<th>Título</th>"+
			"	<th>Autor</th>"+
			"	<th>Ano</th>"+
			"	<th>Gênero</th>"+
			"	<th>Páginas</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbLivros){
			var book = JSON.parse(tbLivros[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' width='30' alt='"+i+"' class='btnEditar'/>  <img src='delete.png' width='30' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+book.Codigo+"</td>" + 	
										 "	<td>"+book.Titulo+"</td>" + 
										 "	<td>"+book.Autor+"</td>" + 
										 "	<td>"+book.Ano+"</td>" + 
										 "	<td>"+book.Genero+"</td>" + 
										 "	<td>"+book.Pagina+"</td>" + 
		  								 "</tr>");
		 }
	}

	function Excluir(){
		tbLivros.splice(indice, 1);
		localStorage.setItem("tbLivros", JSON.stringify(tbLivros));
		alert("Registro excluído.");
	}

	function GetLivro(propriedade, valor){
		var book = null;
        for (var item in tbLivros) {
            var i = JSON.parse(tbLivros[item]);
            if (i[propriedade] == valor)
                book = i;
        }
        return book;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice = parseInt($(this).attr("alt"));
		var book = JSON.parse(tbLivros[indice]);
		$("#txtCodigo").val(book.Codigo);
		$("#txtTitulo").val(book.Titulo);
		$("#txtAutor").val(book.Autor);
		$("#txtAno").val(book.Ano);
		$("#txtGenero").val(book.Genero);
		$("#txtPagina").val(book.Pagina);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtTitulo").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});