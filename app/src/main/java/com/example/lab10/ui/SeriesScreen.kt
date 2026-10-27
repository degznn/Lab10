package com.example.lab10.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.lab10.data.ApiClient
import com.example.lab10.data.SerieModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SeriesScreen() {
    val scope = rememberCoroutineScope()
    var series by remember { mutableStateOf<List<SerieModel>>(emptyList()) }
    var selected by remember { mutableStateOf<SerieModel?>(null) }
    var showEditor by remember { mutableStateOf(false) }
    var pendingDelete by remember { mutableStateOf<SerieModel?>(null) }
    var loading by remember { mutableStateOf(true) }
    var message by remember { mutableStateOf<String?>(null) }

    fun loadSeries() {
        scope.launch {
            loading = true
            runCatching { ApiClient.serieApi.selectSeries() }
                .onSuccess { series = it; message = null }
                .onFailure { message = "No se pudo cargar la API: ${it.message}" }
            loading = false
        }
    }

    LaunchedEffect(Unit) { loadSeries() }

    Scaffold(
        topBar = { TopAppBar(title = { Text("SERIES APP") }) }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Series", style = MaterialTheme.typography.headlineSmall)
                Button(onClick = { selected = null; showEditor = true }) { Text("Nueva") }
            }
            message?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            if (loading) {
                CircularProgressIndicator()
            } else if (series.isEmpty()) {
                Text("No hay registros disponibles.")
            } else {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(series, key = { it.id }) { serie ->
                        SerieCard(
                            serie = serie,
                            onEdit = { selected = serie; showEditor = true },
                            onDelete = { pendingDelete = serie }
                        )
                    }
                }
            }
        }
    }

    if (showEditor) {
        SerieEditor(
            serie = selected,
            onDismiss = { showEditor = false },
            onSaved = {
                showEditor = false
                loadSeries()
            },
            onError = { message = it }
        )
    }

    pendingDelete?.let { serie ->
        AlertDialog(
            onDismissRequest = { pendingDelete = null },
            title = { Text("Confirmar eliminación") },
            text = { Text("¿Eliminar ${serie.name}?") },
            confirmButton = {
                TextButton(onClick = {
                    scope.launch {
                        runCatching { ApiClient.serieApi.deleteSerie(serie.id) }
                            .onSuccess { pendingDelete = null; loadSeries() }
                            .onFailure { message = "No se pudo eliminar: ${it.message}" }
                    }
                }) { Text("Eliminar") }
            },
            dismissButton = { TextButton(onClick = { pendingDelete = null }) { Text("Cancelar") } }
        )
    }
}

@Composable
private fun SerieCard(serie: SerieModel, onEdit: () -> Unit, onDelete: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text("${serie.id}. ${serie.name}", style = MaterialTheme.typography.titleMedium)
            Text("Estreno: ${serie.releaseDate}")
            Text("Rating: ${serie.rating} · Categoría: ${serie.category}")
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = onEdit) { Text("Editar") }
                TextButton(onClick = onDelete) { Text("Eliminar") }
            }
        }
    }
}

@Composable
private fun SerieEditor(
    serie: SerieModel?,
    onDismiss: () -> Unit,
    onSaved: () -> Unit,
    onError: (String) -> Unit
) {
    val scope = rememberCoroutineScope()
    var name by remember { mutableStateOf(serie?.name.orEmpty()) }
    var releaseDate by remember { mutableStateOf(serie?.releaseDate.orEmpty()) }
    var rating by remember { mutableStateOf(serie?.rating?.toString().orEmpty()) }
    var category by remember { mutableStateOf(serie?.category.orEmpty()) }
    var saving by remember { mutableStateOf(false) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (serie == null) "Nueva serie" else "Editar serie") },
        text = {
            Column {
                OutlinedTextField(name, { name = it }, label = { Text("Nombre") }, singleLine = true)
                Spacer(Modifier.height(6.dp))
                OutlinedTextField(releaseDate, { releaseDate = it }, label = { Text("Fecha YYYY-MM-DD") }, singleLine = true)
                Spacer(Modifier.height(6.dp))
                OutlinedTextField(rating, { rating = it }, label = { Text("Rating") }, singleLine = true)
                Spacer(Modifier.height(6.dp))
                OutlinedTextField(category, { category = it }, label = { Text("Categoría") }, singleLine = true)
            }
        },
        confirmButton = {
            TextButton(enabled = !saving, onClick = {
                val ratingValue = rating.toIntOrNull()
                if (name.isBlank() || releaseDate.isBlank() || ratingValue == null || category.isBlank()) {
                    onError("Completa todos los campos correctamente.")
                    return@TextButton
                }
                scope.launch {
                    saving = true
                    val body = SerieModel(
                        serie?.id ?: 0,
                        name.trim(),
                        releaseDate.trim(),
                        ratingValue,
                        category.trim().lowercase()
                    )
                    runCatching {
                        val response = if (serie == null) {
                            ApiClient.serieApi.insertSerie(body)
                        }
                        else ApiClient.serieApi.updateSerie(serie.id, body)
                        if (!response.isSuccessful) {
                            val detail = response.errorBody()?.string().orEmpty()
                            error("HTTP ${response.code()}: $detail")
                        }
                    }.onSuccess { onSaved() }
                        .onFailure { onError("No se pudo guardar: ${it.message}") }
                    saving = false
                }
            }) { Text(if (saving) "Guardando..." else "Guardar") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancelar") } }
    )
}
