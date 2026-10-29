
import { useEffect, useState } from "react";
import AntiqueService from "./AntiqueService";
import "./AntiqueUI.css";

const emptyAntique = {
    antiqueName: "",
    origin: "",
    previousOwner: "",
    antiqueCondition: "",
    madeDate: "",
    historicDetails: "",
    story: ""
};

export default function InsertAntique() {
    const [activeView, setActiveView] = useState("add");
    const [antique, setAntique] = useState({ ...emptyAntique });
    const [antiques, setAntiques] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [singleAntique, setSingleAntique] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const showView = (view) => {
        setActiveView(view);
        setMessage("");
        setError("");
    };

    const loadAntiques = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await AntiqueService.getAllAntiques();
            setAntiques(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error loading antiques:", err);
            setError("Could not load antiques. Check whether Spring Boot is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeView === "all") {
            loadAntiques();
        }
    }, [activeView]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAntique((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const resetForm = () => {
        setAntique({ ...emptyAntique });
        setEditingId(null);
    };

    const saveAntique = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            if (editingId !== null) {
                await AntiqueService.updateAntique(editingId, antique);
                setMessage("Antique updated successfully!");
            } else {
                await AntiqueService.insertAntique(antique);
                setMessage("Antique added to your collection successfully!");
            }

            resetForm();
        } catch (err) {
            console.error("Error saving antique:", err);
            setError(
                err.response?.data?.message ||
                "Unable to save the antique. Check your backend and field names."
            );
        } finally {
            setLoading(false);
        }
    };

    const findAntique = async (e) => {
        e.preventDefault();
        setSingleAntique(null);
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await AntiqueService.getAntique(searchId);
            setSingleAntique(response.data);
        } catch (err) {
            console.error("Error finding antique:", err);
            setError("Antique not found. Please check the ID and try again.");
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (item) => {
        setAntique({
            antiqueName: item.antiqueName ?? "",
            origin: item.origin ?? "",
            previousOwner: item.previousOwner ?? "",
            antiqueCondition: item.antiqueCondition ?? "",
            madeDate: item.madeDate ?? "",
            historicDetails: item.historicDetails ?? "",
            story: item.story ?? ""
        });

        setEditingId(item.aid);
        setActiveView("update");
        setMessage("");
        setError("");
    };

    const deleteAntique = async (id) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete antique #${id}? This cannot be undone.`
        );

        if (!confirmed) return;

        setMessage("");
        setError("");
        setLoading(true);

        try {
            await AntiqueService.deleteAntique(id);
            setMessage(`Antique #${id} deleted successfully.`);

            if (singleAntique?.aid === id) {
                setSingleAntique(null);
            }

            if (editingId === id) {
                resetForm();
            }

            if (activeView === "all") {
                await loadAntiques();
            }
        } catch (err) {
            console.error("Error deleting antique:", err);
            setError("Could not delete this antique.");
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        resetForm();
        setMessage("");
        setError("");
        setActiveView("all");
    };

    const navigation = [
        { id: "add", icon: "+", label: "Add Antique" },
        { id: "all", icon: "▤", label: "All Antiques" },
        { id: "find", icon: "⌕", label: "Find Antique" },
        { id: "update", icon: "✎", label: "Update Antique" }
    ];

    const pageInfo = {
        add: {
            eyebrow: "COLLECTION MANAGEMENT",
            title: "Add a New Antique",
            description: "Preserve a piece of history in your collection."
        },
        all: {
            eyebrow: "YOUR COLLECTION",
            title: "All Antiques",
            description: "Browse and manage your historical collection."
        },
        find: {
            eyebrow: "RECORD LOOKUP",
            title: "Find an Antique",
            description: "Search for a specific antique using its ID."
        },
        update: {
            eyebrow: "COLLECTION MANAGEMENT",
            title: "Update Antique",
            description: "Edit the details of an existing historical record."
        }
    };

    const page = pageInfo[activeView];

    return (
        <div className="archive-app">
            <aside className="archive-sidebar">
                <div className="archive-brand">
                    <div className="brand-emblem">A</div>
                    <div>
                        <h2>Antique Archive</h2>
                        <p>HISTORICAL COLLECTIONS</p>
                    </div>
                </div>

                <div className="sidebar-label">WORKSPACE</div>

                <nav className="archive-nav">
                    {navigation.map((item) => (
                        <button
                            type="button"
                            key={item.id}
                            className={`nav-item ${
                                activeView === item.id ? "active" : ""
                            }`}
                            onClick={() => showView(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-note">
                        <span className="note-symbol">✦</span>
                        <p>
                            Every antique carries a story.
                            <br />
                            Keep its history alive.
                        </p>
                    </div>
                    <p className="sidebar-footer">ANTIQUE ARCHIVE · 2026</p>
                </div>
            </aside>

            <main className="archive-main">
                <header className="topbar">
                    <div className="breadcrumb">
                        Archive <span>/</span> {page.title}
                    </div>
                    <div className="status-label">
                        <span className="status-dot"></span>
                        Collection workspace
                    </div>
                </header>

                <section className="page-content">
                    <div className="page-heading">
                        <div>
                            <p className="eyebrow">{page.eyebrow}</p>
                            <h1>{page.title}</h1>
                            <p className="page-description">{page.description}</p>
                        </div>
                        <div className="heading-decoration">❧</div>
                    </div>

                    {message && (
                        <div className="alert alert-success">{message}</div>
                    )}

                    {error && (
                        <div className="alert alert-error">{error}</div>
                    )}

                    {activeView === "add" && (
                        <section className="panel">
                            <div className="panel-heading">
                                <div>
                                    <h2>Antique information</h2>
                                    <p>Enter the item's details below.</p>
                                </div>
                                <span className="panel-mark">01</span>
                            </div>

                            <AntiqueForm
                                antique={antique}
                                handleChange={handleChange}
                                saveAntique={saveAntique}
                                loading={loading}
                                editing={false}
                            />
                        </section>
                    )}

                    {activeView === "all" && (
                        <section className="panel">
                            <div className="panel-heading">
                                <div>
                                    <h2>Collection records</h2>
                                    <p>
                                        {antiques.length}{" "}
                                        {antiques.length === 1 ? "antique" : "antiques"}{" "}
                                        in the current collection
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="button button-secondary"
                                    onClick={loadAntiques}
                                    disabled={loading}
                                >
                                    ↻ Refresh
                                </button>
                            </div>

                            {loading ? (
                                <p className="empty-state">Loading collection...</p>
                            ) : antiques.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-symbol">◇</div>
                                    <h3>Your collection awaits</h3>
                                    <p>No antiques have been added yet.</p>
                                    <button
                                        type="button"
                                        className="button button-primary"
                                        onClick={() => showView("add")}
                                    >
                                        + Add your first antique
                                    </button>
                                </div>
                            ) : (
                                <div className="table-wrapper">
                                    <table className="antique-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Antique</th>
                                                <th>Origin</th>
                                                <th>Condition</th>
                                                <th>Date created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {antiques.map((item) => (
                                                <tr key={item.aid}>
                                                    <td>#{item.aid}</td>
                                                    <td className="table-name">
                                                        {item.antiqueName}
                                                    </td>
                                                    <td>{item.origin}</td>
                                                    <td>
                                                        <span className="condition-badge">
                                                            {item.antiqueCondition}
                                                        </span>
                                                    </td>
                                                    <td>{item.madeDate}</td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button
                                                                type="button"
                                                                className="icon-button"
                                                                title="View antique"
                                                                onClick={() => {
                                                                    setSearchId(String(item.aid));
                                                                    setSingleAntique(item);
                                                                    showView("find");
                                                                }}
                                                            >
                                                                View
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="icon-button"
                                                                title="Edit antique"
                                                                onClick={() => startEditing(item)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="icon-button delete-button"
                                                                title="Delete antique"
                                                                onClick={() => deleteAntique(item.aid)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    )}

                    {activeView === "find" && (
                        <>
                            <section className="panel search-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Search collection</h2>
                                        <p>Enter the ID of the antique you want to find.</p>
                                    </div>
                                </div>

                                <form onSubmit={findAntique} className="search-form">
                                    <input
                                        type="number"
                                        min="1"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                        placeholder="Enter antique ID, e.g. 1"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="button button-primary"
                                        disabled={loading}
                                    >
                                        {loading ? "Searching..." : "Find Antique"}
                                    </button>
                                </form>
                            </section>

                            {singleAntique && (
                                <section className="panel detail-panel">
                                    <div className="detail-title">
                                        <div>
                                            <p className="eyebrow">
                                                RECORD #{singleAntique.aid}
                                            </p>
                                            <h2>{singleAntique.antiqueName}</h2>
                                            <p>{singleAntique.origin}</p>
                                        </div>
                                        <span className="detail-emblem">✧</span>
                                    </div>

                                    <div className="detail-grid">
                                        <Detail
                                            label="Previous owner"
                                            value={singleAntique.previousOwner}
                                        />
                                        <Detail
                                            label="Condition"
                                            value={singleAntique.antiqueCondition}
                                        />
                                        <Detail
                                            label="Date created"
                                            value={singleAntique.madeDate}
                                        />
                                        <Detail
                                            label="Historic details"
                                            value={singleAntique.historicDetails}
                                        />
                                        <Detail
                                            label="Story"
                                            value={singleAntique.story}
                                            wide
                                        />
                                    </div>

                                    <div className="detail-actions">
                                        <button
                                            type="button"
                                            className="button button-primary"
                                            onClick={() => startEditing(singleAntique)}
                                        >
                                            Edit this antique
                                        </button>
                                        <button
                                            type="button"
                                            className="button button-danger"
                                            onClick={() => deleteAntique(singleAntique.aid)}
                                        >
                                            Delete antique
                                        </button>
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {activeView === "update" && (
                        <section className="panel">
                            <div className="panel-heading">
                                <div>
                                    <h2>
                                        {editingId !== null
                                            ? `Editing antique #${editingId}`
                                            : "Choose an antique to update"}
                                    </h2>
                                    <p>
                                        {editingId !== null
                                            ? "Update the fields and save your changes."
                                            : "Select a record from your collection first."}
                                    </p>
                                </div>
                            </div>

                            {editingId !== null ? (
                                <AntiqueForm
                                    antique={antique}
                                    handleChange={handleChange}
                                    saveAntique={saveAntique}
                                    loading={loading}
                                    editing={true}
                                    cancelEditing={cancelEditing}
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="button button-primary"
                                    onClick={() => showView("all")}
                                >
                                    Browse antiques
                                </button>
                            )}
                        </section>
                    )}
                </section>
            </main>
        </div>
    );
}

function AntiqueForm({
    antique,
    handleChange,
    saveAntique,
    loading,
    editing,
    cancelEditing
}) {
    return (
        <form className="antique-form" onSubmit={saveAntique}>
            <div className="form-section-title">Essential information</div>

            <div className="form-grid">
                <div className="form-field">
                    <label htmlFor="antiqueName">Antique name *</label>
                    <input
                        id="antiqueName"
                        name="antiqueName"
                        value={antique.antiqueName}
                        onChange={handleChange}
                        placeholder="e.g. Royal ceremonial sword"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="origin">Place of origin *</label>
                    <input
                        id="origin"
                        name="origin"
                        value={antique.origin}
                        onChange={handleChange}
                        placeholder="e.g. Rajasthan, India"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="previousOwner">Previous owner or dynasty *</label>
                    <input
                        id="previousOwner"
                        name="previousOwner"
                        value={antique.previousOwner}
                        onChange={handleChange}
                        placeholder="e.g. Rajput dynasty"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="antiqueCondition">Current condition *</label>
                    <select
                        id="antiqueCondition"
                        name="antiqueCondition"
                        value={antique.antiqueCondition}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select condition</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Restored">Restored</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="madeDate">Date created *</label>
                    <input
                        id="madeDate"
                        name="madeDate"
                        type="date"
                        value={antique.madeDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-section-title form-section-spaced">
                Historical record
            </div>

            <div className="form-field">
                <label htmlFor="historicDetails">Historic details</label>
                <textarea
                    id="historicDetails"
                    name="historicDetails"
                    value={antique.historicDetails}
                    onChange={handleChange}
                    placeholder="Describe its era, historical significance, craftsmanship, materials, or known events..."
                    rows="4"
                />
            </div>

            <div className="form-field">
                <label htmlFor="story">Story behind the antique</label>
                <textarea
                    id="story"
                    name="story"
                    value={antique.story}
                    onChange={handleChange}
                    placeholder="Record legends, family history, how it was discovered, or stories passed down through generations..."
                    rows="5"
                />
            </div>

            <p className="form-hint">* Required fields</p>

            <div className="form-actions">
                <button
                    type="submit"
                    className="button button-primary"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : editing
                            ? "Save Changes"
                            : "Add to Collection"}
                </button>

                {editing && (
                    <button
                        type="button"
                        className="button button-secondary"
                        onClick={cancelEditing}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

function Detail({ label, value, wide = false }) {
    return (
        <div className={`detail-item ${wide ? "detail-wide" : ""}`}>
            <span>{label}</span>
            <p>{value || "No details recorded yet."}</p>
        </div>
    );
}
